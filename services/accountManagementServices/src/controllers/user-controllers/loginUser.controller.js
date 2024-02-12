'use strict';

import dbConnect from '../../db/index.js';
import emailServices from '../../email/index.js';

const isUserValid = async(payload) => {
    const userNameOrEmail = payload.userNameOrEmail;
    const isUserAvailable = await dbConnect.isUserByUserNameOrEmailAvailable(userNameOrEmail, userNameOrEmail);

    if (isUserAvailable) {
        const isPasswordCorrect = await dbConnect.verifyPassword(isUserAvailable, payload.password);

        if (isPasswordCorrect) {
            return {
                resType: 'SUCCESS',
                resMsg: 'VALIDATION SUCCESSFULL',
                data: isUserAvailable,
                isValid: true
            };
        }
        return {
            resType: 'UNAUTHORIZED',
            resMsg: 'UNAUTHORIZED ACCESS - CREDENTIALS INVALID',
            isValid: false
        };
    }
    return {
        resType: 'NOT_FOUND',
        resMsg: 'USER NOT FOUND',
        isValid: false
    };
}

const isUserVerified = async(user) => {
    if (user.isVerified) {
        return {
            resType: 'SUCCESS',
            resMsg: 'USER VERIFIED',
            isValid: true
        };
    }

    const updatedUserInfo = await dbConnect.generateVerificationCode(user._id);
    emailServices.sendVerificationMail(
        updatedUserInfo._id,
        updatedUserInfo.emailId,
        updatedUserInfo.firstName + ' ' + updatedUserInfo.lastName,
        updatedUserInfo.verificationCode
    );

    return {
        resType: 'REQUEST_COMPLETED',
        resMsg: 'NEW VERIFICATION CODE SENT',
        isValid: false
    };
}

const isUserActive = async(user) => {
    if (user.isDeleted) {
        const updatedUserInfo = await dbConnect.reactivateUser(user._id);
        const fullName = updatedUserInfo.firstName + ' ' + updatedUserInfo.lastName;
        emailServices.accountReactivatedMail(updatedUserInfo.emailId, fullName);
    }
}

const generateAccessAndRefreshTokens = async(userId) => {
    const loggedInUser = await dbConnect.generateAccessAndRefreshTokens(userId);
    return {
        resType: 'SUCCESS',
        resMsg: 'LOGIN SUCCESSFULL',
        data: loggedInUser,
        isValid: true
    };
}

export {
    isUserValid,
    isUserVerified,
    isUserActive,
    generateAccessAndRefreshTokens
};

'use strict';

import dbConnect from '../../db/index.js';
import emailServices from '../../email/index.js';

const updateUserPassword = async(userId, payload) => {
    try {
        if (payload.oldPassword !== payload.newPassword) {
            const isPasswordUpdated = await dbConnect.updateUserPassword(userId, payload);

            if (isPasswordUpdated) {
                emailServices.passwordUpdatedSuccessfullMail(isPasswordUpdated.emailId, isPasswordUpdated.firstName + ' ' + isPasswordUpdated.lastName);
                return {
                    resType: 'REQUEST_COMPLETED',
                    resMsg: 'PASSWORD UPDATED',
                    data: isPasswordUpdated,
                    isValid: true
                };
            }
            return {
                resType: 'UNAUTHORIZED',
                resMsg: 'UNAUTHORIZED USER - Password does not match',
                isValid: false
            }
        }
        return {
            resType: 'BAD_REQUEST',
            resMsg: 'NEW PASSWORD CANNOT BE SAME AS OLD',
            isValid: false
        };
    } catch (err) {
        return {
            resType: 'INTERNAL_SERVER_ERROR',
            resMsg: err,
            stack: err.stack,
            isValid: false
        };
    }
}

const requestReset = async(user) => {
    try {
        const updatedUserInfo = await dbConnect.generateVerificationCode(user._id);

        emailServices.requestPasswordResetMail({
            fullName: updatedUserInfo.firstName + ' ' + updatedUserInfo.lastName,
            custId: updatedUserInfo._id,
            emailId: updatedUserInfo.emailId,
            verificationCode: updatedUserInfo.verificationCode
        });
        return {
            resType: 'REQUEST_COMPLETED',
            resMsg: 'RESET LINK SENT',
            data: {
                firstName: updatedUserInfo.firstName,
                lastName: updatedUserInfo.lastName,
                userName: updatedUserInfo.userName,
                emailId: updatedUserInfo.emailId,
                verificationCode: updatedUserInfo.verificationCode
            },
            isValid: true
        };
    } catch (err) {
        return {
            resType: 'INTERNAL_SERVER_ERROR',
            resMsg: err,
            stack: err.stack,
            isValid: false
        };
    }
}

const resetPassword = async(userId, payload) => {
    try {
        const currentTime = Date.now();
        const verificationTime = Math.ceil((currentTime - payload.time) / (30 * 60 * 1000));

        const userInfo = await dbConnect.getCompleteUserInfoById(userId);

        if ((verificationTime <= 1) && (payload.verificationCode === userInfo.verificationCode)) {
            const isPasswordSame = await dbConnect.verifyPassword(userInfo, payload.password);

            if (!isPasswordSame) {
                const isPasswordUpdated = await dbConnect.resetUserPassword(userId, payload.password);
                
                emailServices.passwordUpdatedSuccessfullMail(isPasswordUpdated.emailId, isPasswordUpdated.firstName + ' ' + isPasswordUpdated.lastName);
                return {
                    resType: 'REQUEST_COMPLETED',
                    resMsg: 'PASSWORD RESET SUCCESSFULL',
                    data: isPasswordUpdated,
                    isValid: true
                };
            }
            return {
                resType: 'BAD_REQUEST',
                resMsg: 'NEW PASSWORD CANNOT BE SAME AS OLD',
                isValid: false
            };
        }

        return {
            resType: 'BAD_REQUEST',
            resMsg: 'USER VERIFICATION FAILED',
            isValid: false
        };
    } catch (err) {
        return {
            resType: 'INTERNAL_SERVER_ERROR',
            resMsg: err,
            stack: err.stack,
            isValid: false
        };
    }
}

export {
    updateUserPassword,
    requestReset,
    resetPassword
};

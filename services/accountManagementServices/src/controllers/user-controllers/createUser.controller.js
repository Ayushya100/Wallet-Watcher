'use strict';

import dbConnection from '../../db/index.js';
import emailServices from '../../email/index.js';

// Check for existing user with provided userName or emailId
const checkUserByUserNameOrEmail = async(payload) => {
    try {
        const emailId = payload.emailId;
        const userName = payload.userName;

        const response = {
            resType: 'SUCCESS',
            resMsg: 'VALIDATION SUCCESSFULL',
            isValid: true
        };
        const isUserFound = await dbConnection.isUserByUserNameOrEmailAvailable(userName, emailId);

        if (isUserFound) {
            response.resType = 'CONFLICT';
            response.resMsg = 'User already exist with same username or emailId.',
            response.isValid = false;
        }

        return response;
    } catch(err) {
        return {
            resType: 'INTERNAL_SERVER_ERROR',
            resMsg: 'Some error occurred while working with db.',
            stack: err.stack,
            isValid: false
        };
    }
}

// Create a new user and send verification mail
const createNewUser = async(payload) => {
    try {
        const newUser = await dbConnection.createNewUser(payload);

        if (newUser) {
            const userId = newUser._id;
            const emailId = newUser.emailId;
            const fullName = newUser.firstName + ' ' + newUser.lastName;
            const verificationCode = newUser.verificationCode;

            emailServices.sendVerificationMail(userId, emailId, fullName, verificationCode);
            return {
                resType: 'REQUEST_COMPLETED',
                resMsg: 'User Created Successfully',
                data: newUser,
                isValid: true
            };
        } else {
            return {
                resType: 'INTERNAL_SERVER_ERROR',
                resMsg: 'USER CREATION FAILED. INTERNAL ERROR OCCURRED',
                isValid: false
            };
        }
    } catch (err) {
        return {
            resType: 'INTERNAL_SERVER_ERROR',
            resMsg: 'Some error occurred while working with db.',
            stack: err.stack,
            isValid: false
        };
    }
}

export {
    checkUserByUserNameOrEmail,
    createNewUser
};

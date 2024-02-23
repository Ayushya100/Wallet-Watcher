'use strict';

import dbConnect from '../../db/index.js';
import emailServices from '../../email/index.js';

const updateUserPassword = async(userId, payload) => {
    try {
        if (payload.oldPassword !== payload.newPassword) {
            const isPasswordUpdated = await dbConnect.updateUserPassword(userId, payload);

            if (isPasswordUpdated) {
                emailServices.passwordUpdatedSuccessfullMail(isPasswordUpdated.emailId, isPasswordUpdated.firstName + ' ' + isPasswordUpdated.lastName)
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

export {
    updateUserPassword
};

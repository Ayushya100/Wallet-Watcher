'use strict';

import dbConnect from '../../db/index.js';
import emailServices from '../../email/index.js';

const validateUserCredentials = async(userId, payload) => {
    try {
        const userInfo = await dbConnect.getCompleteUserInfoById(userId);

        if (!userInfo.isDeleted) {
            if ((userInfo.userName == payload.userName) && (await dbConnect.isPasswordValid(userInfo, payload.password))) {
                return {
                    resType: 'SUCCESS',
                    resMsg: 'VALIDATION SUCCESSFULL',
                    isValid: true
                };
            }
            return {
                resType: 'UNAUTHORIZED',
                resMsg: 'CREDENTIALS INVALID',
                isValid: false
            };
        }
        return {
            resType: 'BAD_REQUEST',
            resMsg: 'User Already Deactive',
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

const deactivateUser = async(userId) => {
    try {
        const isUserDeactivated = await dbConnect.userDeactivate(userId);

        if (isUserDeactivated) {
            const modifiedOn = isUserDeactivated.modifiedOn;
            emailServices.accountDeactivatedMail({
                emailId: isUserDeactivated.emailId,
                fullName: isUserDeactivated.firstName + ' ' + isUserDeactivated.lastName,
                dateOfDeactivation: modifiedOn.toDateString(),
                reactivationTimeline: new Date(modifiedOn.setDate(modifiedOn.getDate() + 30)).toDateString()
            });

            return {
                resType: 'REQUEST_COMPLETED',
                resMsg: 'USER DEACTIVATED',
                data: isUserDeactivated,
                isValid: true
            };
        }
        return {
            resType: 'BAD_REQUEST',
            resMsg: 'OPERATION FAILED',
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
    validateUserCredentials,
    deactivateUser
};

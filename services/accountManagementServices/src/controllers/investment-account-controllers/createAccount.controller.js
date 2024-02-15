'use strict';

import dbConnect from '../../db/index.js';

// Check for existing account with same number
const checkAccountByAccNumber = async(accountNumber) => {
    try {
        let response = {
            resType: 'SUCCESS',
            resMsg: 'VALIDATION SUCCESSFULL',
            isValid: true
        };

        const accountInfo = await dbConnect.isAccountByAccNumberAvailable(accountNumber);

        if (accountInfo) {
            response.resType = 'CONFLICT';
            response.resMsg = 'Account already exists with same number.';
            response.isValid = false;
        }
        return response;
    } catch (err) {
        return {
            resType: 'INTERNAL_SERVER_ERROR',
            resMsg: 'Some error occurred while working with db.',
            stack: err.stack,
            isValid: false
        };
    }
}

// Create new account
const createAccount = async(userId, payload) => {
    try {
        payload.accountDate = new Date(payload.accountDate);
        const newAccount = await dbConnect.createAccount(userId, payload);

        if (newAccount) {
            return {
                resType: 'REQUEST_COMPLETED',
                resMsg: 'Account Created Successfully',
                data: newAccount,
                isValid: true
            };
        }
        return {
            resType: 'INTERNAL_SERVER_ERROR',
            resMsg: 'ACCOUNT CREATION FAILED. INTERNAL ERROR OCCURRED',
            isValid: false
        };
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
    checkAccountByAccNumber,
    createAccount
};

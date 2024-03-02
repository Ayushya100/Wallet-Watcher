'use strict';

import dbConnect from '../../db/index.js';
import emailServices from '../../email/index.js';
import { maskAccountNumber, generateAccountToken, encryptAccountData } from '../../utils/accounts.js';

// Check for existing account with same number
const checkAccountByAccNumber = async(accountNumber) => {
    try {
        let response = {
            resType: 'SUCCESS',
            resMsg: 'VALIDATION SUCCESSFULL',
            isValid: true
        };

        const maskedAccountNumber = maskAccountNumber(accountNumber);
        const accountInfo = await dbConnect.isAccountByAccNumberAvailable(maskedAccountNumber);

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
        const userInfo = await dbConnect.isUserByIdAvailable(userId);

        const emailPayload = {
            fullName: userInfo.firstName + ' ' + userInfo.lastName,
            emailId: userInfo.emailId,
            accountName: payload.accountName,
            accountNumber: payload.accountNumber,
            accountDate: payload.accountDate,
            holderName: payload.holderName
        };

        const maskedAccountNumber = maskAccountNumber(String(payload.accountNumber));
        payload.accountNumber = maskedAccountNumber;
        payload.token = generateAccountToken(maskedAccountNumber);
        payload.accountName = encryptAccountData(String(payload.accountName));
        payload.holderName = encryptAccountData(String(payload.holderName));
        
        payload.accountDate = new Date(payload.accountDate);
        payload.accountDate = encryptAccountData(String(payload.accountDate));

        const newAccount = await dbConnect.createAccount(userId, payload);

        if (newAccount) {
            emailServices.sendAccountRegistrationMail(emailPayload);
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

'use strict';

import dbconnect from '../../db/index.js';
import emailServices from '../../email/index.js';
import { encryptAccountData, decryptAccountData } from '../../utils/index.js';

const updateAccountInfo = async(userId, accountToken, payload) => {
    try {
        if (payload.accountDate) {
            payload.accountDate = encryptAccountData(payload.accountDate);
        }
        if (payload.holderName) {
            payload.holderName = encryptAccountData(payload.holderName);
        }

        const updatedAccountInfo = await dbconnect.updateExistingAccount(userId, accountToken, payload);
        
        updatedAccountInfo.accountName = decryptAccountData(String(updatedAccountInfo.accountName));
        updatedAccountInfo.accountDate = decryptAccountData(String(updatedAccountInfo.accountDate));
        updatedAccountInfo.holderName = decryptAccountData(String(updatedAccountInfo.holderName));

        const userInfo = await dbconnect.isUserByIdAvailable(userId);

        const emailPayload = {
            fullName: userInfo.firstName + ' ' + userInfo.lastName,
            emailId: userInfo.emailId,
            accountNumber: updatedAccountInfo.accountNumber,
            holderName: updatedAccountInfo.holderName,
            accountDate: updatedAccountInfo.accountDate
        };
        emailServices.sendAccountUpdatedMail(emailPayload);

        return {
            resType: 'REQUEST_COMPLETED',
            resMsg: 'Account Info Updated',
            data: updatedAccountInfo,
            isValid: true
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
    updateAccountInfo
};

'use strict';

import dbConnect from '../../db/index.js';
import emailServices from '../../email/index.js';
import { decryptAccountData } from '../../utils/index.js';

const reactivateAccount = async(userId, accountToken) => {
    try {
        const updatedAccountInfo = await dbConnect.reactivateAccount(userId, accountToken);
        updatedAccountInfo.accountName = decryptAccountData(String(updatedAccountInfo.accountName));
        updatedAccountInfo.accountDate = decryptAccountData(String(updatedAccountInfo.accountDate));
        updatedAccountInfo.holderName = decryptAccountData(String(updatedAccountInfo.holderName));

        const userInfo = await dbConnect.isUserByIdAvailable(userId);

        const emailPayload = {
            fullName: userInfo.firstName + ' ' + userInfo.lastName,
            emailId: userInfo.emailId,
            accountNumber: updatedAccountInfo.accountNumber
        };
        emailServices.sendAccountReactivationMail(emailPayload);

        return {
            resType: 'REQUEST_COMPLETED',
            resMsg: 'Account Reactivated Successfully',
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
    reactivateAccount
};

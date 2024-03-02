'use strict';

import dbConnect from '../../db/index.js';
import { decryptAccountData, convertFullDateToString } from '../../utils/index.js';

const getAllAccountInfo = async(userId) => {
    try {
        const allAccountInfo = await dbConnect.getAllAccountInfo(userId);

        for (const accountInfo of allAccountInfo) {
            accountInfo.accountName = decryptAccountData(String(accountInfo.accountName));
            accountInfo.holderName = decryptAccountData(String(accountInfo.holderName));
            accountInfo.accountDate = decryptAccountData(String(accountInfo.accountDate));
            accountInfo.accountDate = convertFullDateToString(accountInfo.accountDate);
        }

        if (allAccountInfo.length > 0) {
            return {
                resType: 'REQUEST_ACCEPTED',
                resMsg: 'Account details found',
                data: allAccountInfo,
                isValid: true
            };
        }
        return {
            resType: 'NOT_FOUND',
            resMsg: 'No Account Found',
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

const getAccountInfoByToken = async(userId, accountToken) => {
    try {
        const oneAccountInfo = await dbConnect.getAccountByToken(userId, accountToken);

        oneAccountInfo.accountName = decryptAccountData(String(oneAccountInfo.accountName));
        oneAccountInfo.holderName = decryptAccountData(String(oneAccountInfo.holderName));
        oneAccountInfo.accountDate = decryptAccountData(String(oneAccountInfo.accountDate));
        oneAccountInfo.accountDate = convertFullDateToString(oneAccountInfo.accountDate);

        if (oneAccountInfo) {
            return {
                resType: 'REQUEST_ACCEPTED',
                resMsg: 'Account detail found',
                data: oneAccountInfo,
                isValid: true
            };
        }
        return {
            resType: 'NOT_FOUND',
            resMsg: 'No Account Found',
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
    getAllAccountInfo,
    getAccountInfoByToken
};

'use strict';

import dbConnect from '../../db/index.js';

const getAllAccountInfo = async(userId) => {
    try {
        const allAccountInfo = await dbConnect.getAllAccountInfo(userId);

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

const getAccountInfoById = async(userId, accountId) => {
    try {
        const oneAccountInfo = await dbConnect.getAccountById(userId, accountId);

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
    getAccountInfoById
};

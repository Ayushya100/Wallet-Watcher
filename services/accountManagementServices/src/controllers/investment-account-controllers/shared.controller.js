'use strict';

import dbConnect from '../../db/index.js';

const isAccountByIdExist = async(userId, accountId) => {
    try {
        const isAccountAvailable = await dbConnect.getAccountById(userId, accountId);

        if (isAccountAvailable) {
            return {
                resType: 'SUCCESS',
                resMsg: 'VALIDATION SUCCESSFULL',
                data: isAccountAvailable,
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
    isAccountByIdExist
};

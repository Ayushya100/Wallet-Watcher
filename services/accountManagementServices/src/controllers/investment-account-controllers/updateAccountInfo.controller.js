'use strict';

import dbconnect from '../../db/index.js';

const updateAccountInfo = async(userId, accountId, payload) => {
    try {
        const updatedAccountInfo = await dbconnect.updateExistingAccount(userId, accountId, payload);
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

'use strict';

import dbConnect from '../../db/index.js';

const deleteAccount = async(userId, accountId) => {
    try {
        const updatedAccountInfo = await dbConnect.deleteAccount(userId, accountId);

        return {
            resType: 'REQUEST_COMPLETED',
            resMsg: 'Account Deleted Successfully',
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
    deleteAccount
};

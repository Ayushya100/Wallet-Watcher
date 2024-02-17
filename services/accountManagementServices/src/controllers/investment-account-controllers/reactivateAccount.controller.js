'use strict';

import dbConnect from '../../db/index.js';

const reactivateAccount = async(userId, accountId) => {
    try {
        const updatedAccountInfo = await dbConnect.reactivateAccount(userId, accountId);

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

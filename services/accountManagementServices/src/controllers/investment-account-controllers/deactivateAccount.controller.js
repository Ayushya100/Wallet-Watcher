'use strict';

import dbConnect from '../../db/index.js';

const deactivateAccount = async(userId, accountId) => {
    try {
        const updatedAccountInfo = await dbConnect.deactivateAccount(userId, accountId);

        return {
            resType: 'REQUEST_COMPLETED',
            resMsg: 'Account Deactivated Successfully',
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
    deactivateAccount
};

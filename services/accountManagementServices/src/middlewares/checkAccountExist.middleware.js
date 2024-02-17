'use strict';

import dbConnect from '../db/index.js';

const checkAccountExist = async(req, res, next) => {
    try {
        const userId = req.params.userId;
        const accountId = req.params.id;

        const isAccountAvailable = await dbConnect.getAccountById(userId, accountId);

        if (!isAccountAvailable) {
            next({
                resType: 'NOT_FOUND',
                resMsg: 'No Account Found',
                isValid: false
            });
        }
        next();
    } catch (err) {
        next({
            resType: 'INTERNAL_SERVER_ERROR',
            resMsg: 'Some error occurred while working with db.',
            stack: err.stack,
            isValid: false
        });
    }
}

export default checkAccountExist;

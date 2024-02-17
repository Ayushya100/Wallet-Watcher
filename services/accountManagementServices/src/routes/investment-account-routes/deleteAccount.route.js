'use strict';

import { ApiResponse, responseCodes, responseMessage } from 'lib-service-comms';
import accountServices from '../../controllers/investment-account-controllers/index.js';

// API Function
const deleteAccount = async(req, res, next) => {
    try {
        const userId = req.params.userId;
        const accountId = req.params.id;

        // Check if Account exist
        const isAccountAvailable = await accountServices.isAccountByIdExist(userId, accountId);

        if (isAccountAvailable.isValid) {
            const isAccountDeleted = await accountServices.deleteAccount(userId, accountId);

            if (isAccountDeleted.isValid) {
                res.status(responseCodes[isAccountDeleted.resType]).json(
                    new ApiResponse(
                        responseCodes[isAccountDeleted.resType],
                        isAccountDeleted.data,
                        isAccountDeleted.resMsg + ' - ' + responseMessage[isAccountDeleted.resType]
                    )
                );
            } else {
                return next(isAccountDeleted);
            }
        } else {
            return next(isAccountAvailable);
        }
    } catch (err) {
        next({
            resType: 'INTERNAL_SERVER_ERROR',
            resMsg: err,
            stack: err.stack,
            isValid: false
        });
    }
}

export default deleteAccount;

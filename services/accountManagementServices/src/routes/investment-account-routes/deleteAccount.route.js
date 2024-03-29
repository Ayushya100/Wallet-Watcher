'use strict';

import { ApiResponse, responseCodes, responseMessage } from 'lib-service-comms';
import accountServices from '../../controllers/investment-account-controllers/index.js';

// API Function
const deleteAccount = async(req, res, next) => {
    try {
        const userId = req.params.userId;
        const accountToken = req.params.accountToken;

        const isAccountDeleted = await accountServices.deleteAccount(userId, accountToken);

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

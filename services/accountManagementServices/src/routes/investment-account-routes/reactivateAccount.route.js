'use strict';

import { ApiResponse, responseCodes, responseMessage } from 'lib-service-comms';
import accountServices from '../../controllers/investment-account-controllers/index.js';

// API Function
const reactivateAccount = async(req, res, next) => {
    try {
        const userId = req.params.userId;
        const accountId = req.params.id;

        const isAccountReactivated = await accountServices.reactivateAccount(userId, accountId);

        if (isAccountReactivated.isValid) {
            res.status(responseCodes[isAccountReactivated.resType]).json(
                new ApiResponse(
                    responseCodes[isAccountReactivated.resType],
                    isAccountReactivated.data,
                    isAccountReactivated.resMsg + ' - ' + responseMessage[isAccountReactivated.resType]
                )
            );
        } else {
            return next(isAccountReactivated);
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

export default reactivateAccount;

'use strict';

import { ApiResponse, responseCodes, responseMessage } from 'lib-service-comms';
import accountServices from '../../controllers/investment-account-controllers/index.js';

// API Function
const deactivateAccount = async(req, res, next) => {
    try {
        const userId = req.params.userId;
        const accountId = req.params.id;

        const isAccountDeactivated = await accountServices.deactivateAccount(userId, accountId);

        if (isAccountDeactivated.isValid) {
            res.status(responseCodes[isAccountDeactivated.resType]).json(
                new ApiResponse(
                    responseCodes[isAccountDeactivated.resType],
                    isAccountDeactivated.data,
                    isAccountDeactivated.resMsg + ' - ' + responseMessage[isAccountDeactivated.resType]
                )
            );
        } else {
            return next(isAccountDeactivated);
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

export default deactivateAccount;

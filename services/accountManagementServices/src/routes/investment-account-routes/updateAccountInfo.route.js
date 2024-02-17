'use strict';

import { ApiResponse, responseCodes, responseMessage } from 'lib-service-comms';
import accountServices from '../../controllers/investment-account-controllers/index.js';

// API Function
const updateAccountInfo = async(req, res, next) => {
    try {
        const userId = req.params.userId;
        const accountId = req.params.id;
        const payload = req.body;

        // Check if account exist
        const isAccountAvailable = await accountServices.isAccountByIdExist(userId, accountId);

        if (isAccountAvailable.isValid) {
            const isAccountDetailsUpdated = await accountServices.updateAccountInfo(userId, accountId, payload);

            if (isAccountDetailsUpdated.isValid) {
                res.status(responseCodes[isAccountDetailsUpdated.resType]).json(
                    new ApiResponse(
                        responseCodes[isAccountDetailsUpdated.resType],
                        isAccountDetailsUpdated.data,
                        isAccountDetailsUpdated.resMsg + ' - ' + responseMessage[isAccountDetailsUpdated.resType]
                    )
                );
            } else {
                return next(isAccountDetailsUpdated);
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

export default updateAccountInfo;

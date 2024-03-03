'use strict';

import { ApiResponse, responseCodes, responseMessage } from 'lib-service-comms';
import accountServices from '../../controllers/investment-account-controllers/index.js';

// API Function
const updateAccountInfo = async(req, res, next) => {
    try {
        const userId = req.params.userId;
        const accountToken = req.params.accountToken;
        const payload = req.body;

        // Validate Payload
        const isValidPayload = accountServices.validateUpdateAccountPayload(payload); 

        if (isValidPayload.isValid) {
            const isAccountDetailsUpdated = await accountServices.updateAccountInfo(userId, accountToken, payload);
    
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
            return next(isValidPayload);
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

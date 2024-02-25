'use strict';

import { ApiResponse, responseCodes, responseMessage } from 'lib-service-comms';
import userServices from '../../controllers/user-controllers/index.js';

// API Function
const requestPasswordReset = async(req, res, next) => {
    try {
        const payload = req.body;

        // Validate Payload
        const isValidPayload = userServices.validateResetRequestPayload(payload.userNameOrEmail);

        if (isValidPayload.isValid) {
            // Check if user exist
            const isUserAvailable = await userServices.checkUserByEmailOrUserName(payload.userNameOrEmail);

            if (isUserAvailable.isValid) {
                // do reset
                const isRequestComplete = await userServices.requestReset(isUserAvailable.data);

                if (isRequestComplete.isValid) {
                    res.status(responseCodes[isRequestComplete.resType]).json(
                        new ApiResponse(
                            responseCodes[isRequestComplete.resType],
                            isRequestComplete.data,
                            responseMessage[isRequestComplete.resType] + ' - ' + isRequestComplete.resMsg
                        )
                    );
                } else {
                    return next(isRequestComplete);
                }
            } else {
                return next(isUserAvailable);
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

export default requestPasswordReset;

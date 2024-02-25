'use strict';

import { ApiResponse, responseCodes, responseMessage } from 'lib-service-comms';
import userServices from '../../controllers/user-controllers/index.js';

// API Function
const resetPassword = async(req, res, next) => {
    try {
        const userId = req.params.userId;
        const payload = req.body;

        // Validate Payload
        const isValidPayload = userServices.validateResetPasswordPayload(payload);

        if (isValidPayload.isValid) {
            // Check if user exists
            const isUserAvailable = await userServices.checkUserById(userId);

            if (isUserAvailable.isValid) {
                // Update Password
                const isPasswordUpdated = await userServices.resetPassword(userId, payload);

                if (isPasswordUpdated.isValid) {
                    res.status(responseCodes[isPasswordUpdated.resType]).json(
                        new ApiResponse(
                            responseCodes[isPasswordUpdated.resType],
                            isPasswordUpdated.data,
                            responseMessage[isPasswordUpdated.resType] + ' - ' + isPasswordUpdated.resMsg
                        )
                    );
                } else {
                    return next(isPasswordUpdated);
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

export default resetPassword;

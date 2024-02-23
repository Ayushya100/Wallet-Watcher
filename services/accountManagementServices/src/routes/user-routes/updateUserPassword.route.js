'use strict';

import { ApiResponse, responseCodes, responseMessage } from 'lib-service-comms';
import userServices from '../../controllers/user-controllers/index.js';

// API Function
const updateUserPassword = async(req, res, next) => {
    try {
        const userId = req.params.userId;
        const payload = req.body;

        // Validate Payload
        const isValidPayload = userServices.validatePasswordUpdatePayload(payload);

        if (isValidPayload.isValid) {
            // Check if user exists
            const isUserAvailable = await userServices.checkUserById(userId);

            if (isUserAvailable.isValid) {
                // Update user password
                const isPasswordUpdated = await userServices.updateUserPassword(userId, payload);

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

export default updateUserPassword;

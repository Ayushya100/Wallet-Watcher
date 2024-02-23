'use strict';

import { ApiResponse, responseCodes, responseMessage } from 'lib-service-comms';
import userServices from '../../controllers/user-controllers/index.js';

// API Function
const updateUserDetails = async(req, res, next) => {
    try {
        const userId = req.params.userId;
        const payload = req.body;

        // Validate Payload
        const isValidPayload = userServices.validateUserDetailsPayload(payload);

        if (isValidPayload.isValid) {
            // Check if user exists
            const isUserAvailable = await userServices.checkUserById(userId);
    
            if (isUserAvailable.isValid) {
                // Update user Info
                const isUserInfoUpdated = await userServices.updateUserDetails(userId, payload);

                if (isUserInfoUpdated.isValid) {
                    res.status(responseCodes[isUserInfoUpdated.resType]).json(
                        new ApiResponse(
                            responseCodes[isUserInfoUpdated.resType],
                            isUserInfoUpdated.data,
                            responseMessage[isUserInfoUpdated.resType] + ' - ' + isUserInfoUpdated.resMsg
                        )
                    );
                } else {
                    return next(isUserInfoUpdated);
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

export default updateUserDetails;

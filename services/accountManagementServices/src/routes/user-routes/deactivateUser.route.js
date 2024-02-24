'use strict';

import { ApiResponse, responseCodes, responseMessage } from 'lib-service-comms';
import userServices from '../../controllers/user-controllers/index.js';

// API Function
const deactivateUser = async(req, res, next) => {
    try {
        const userId = req.params.userId;
        const payload = req.body;

        // Validate Payload
        const isValidPayload = userServices.validateDeactivateUserPayload(payload);

        if (isValidPayload.isValid) {
            // Check if user exists
            const isUserAvailable = await userServices.checkUserById(userId);

            if (isUserAvailable.isValid) {
                // Validate Credentials
                const isValidCredentials = await userServices.validateUserCredentials(userId, payload);

                if (isValidCredentials.isValid) {
                    // Deactivate User
                    const isUserDeactivated = await userServices.deactivateUser(userId);

                    if (isUserDeactivated.isValid) {
                        res.status(responseCodes[isUserDeactivated.resType]).json(
                            new ApiResponse(
                                responseCodes[isUserDeactivated.resType],
                                isUserDeactivated.data,
                                isUserDeactivated.resMsg + ' - ' + responseMessage[isUserDeactivated.resType]
                            )
                        );
                    } else {
                        return next(isUserDeactivated);
                    }
                } else {
                    return next(isValidCredentials);
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

export default deactivateUser;

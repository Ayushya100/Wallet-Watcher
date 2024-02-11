'use strict';

import { ApiResponse, responseCodes, responseMessage } from 'lib-service-comms';
import userServices from '../../controllers/user-controllers/index.js';

// API Function
const createUser = async(req, res, next) => {
    try {
        const payload = req.body;

        // Validate Payload
        const isValidPayload = userServices.validateRegisterUserPayload(payload);

        if (isValidPayload.isValid) {
            // Check for user with same email or username
            const isUserExists = await userServices.checkUserByUserNameOrEmail(payload);

            if (isUserExists.isValid) {

                // Create new user
                const isUserCreated = await userServices.createNewUser(payload);

                if (isUserCreated.isValid) {
                    res.status(responseCodes[isUserCreated.resType]).json(
                        new ApiResponse(
                            responseCodes[isUserCreated.resType],
                            isUserCreated.data,
                            isUserCreated.resMsg + ' - ' + responseMessage[isUserCreated.resType]
                        )
                    );
                } else {
                    return next(isUserCreated);
                }
            } else {
                return next(isUserExists);
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
};

export default createUser;

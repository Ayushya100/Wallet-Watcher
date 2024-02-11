'use strict';

import { ApiResponse, responseCodes, responseMessage } from 'lib-service-comms';
import userServices from '../../controllers/user-controllers/index.js';

// API function
const verifyUser = async(req, res, next) => {
    try {
        const userId = req.params.userId;
        const requestTime = req.body.time;
        const verificationCode = req.body.verificationCode;

        // Validate Payload
        const isValidPayload = userServices.validateUserVerificationPayload(requestTime, verificationCode);

        if (isValidPayload.isValid) {
            // Check user exists or not
            const isUserExist = await userServices.checkUserById(userId);

            if (isUserExist.isValid) {
                // Validate user and send mail
                const isUserValidated = await userServices.verifyUser({userId, requestTime, verificationCode});
                
                if (isUserValidated.isValid) {
                    res.status(responseCodes[isUserValidated.resType]).json(
                        new ApiResponse(
                            responseCodes[isUserValidated.resType],
                            isUserValidated.data,
                            isUserValidated.resMsg + ' - ' + responseMessage[isUserValidated.resType]
                        )
                    );
                } else {
                    return next(isUserValidated);
                }
            } else {
                return next(isUserExist);
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

export default verifyUser;

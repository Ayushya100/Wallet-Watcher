'use strict';

import userServices from '../../controllers/user-controllers/index.js';
import { ApiResponse, responseCodes, responseMessage } from 'lib-service-comms';
import { COOKIE_OPTIONS } from '../../constants.js';

// API Function
const loginUser = async(req, res, next) => {
    try {
        const payload = req.body;

        const isValidPayload = userServices.validateUserLoginPayload(payload);

        if (isValidPayload.isValid) {
            const isUserValid = await userServices.isUserValid(payload);

            if (isUserValid.isValid) {
                const isUserVerified = await userServices.isUserVerified(isUserValid.data);

                if (isUserVerified.isValid) {
                    await userServices.isUserActive(isUserValid.data);
                    const loggedInUser = await userServices.generateAccessAndRefreshTokens(isUserValid.data._id);

                    res.status(responseCodes[loggedInUser.resType])
                    .cookie('accessToken', loggedInUser.data.accessToken, COOKIE_OPTIONS)
                    .cookie('refreshToken', loggedInUser.data.refreshToken, COOKIE_OPTIONS)
                    .json(
                        new ApiResponse(
                            responseCodes[loggedInUser.resType],
                            loggedInUser.data,
                            loggedInUser.resMsg + ' - ' + responseMessage[loggedInUser.resType]
                        )
                    );
                } else {
                    return next(isUserVerified);
                }
            } else {
                return next(isUserValid);
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

export default loginUser;

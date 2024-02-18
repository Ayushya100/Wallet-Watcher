'use strict';

import { ApiResponse, responseCodes, responseMessage } from 'lib-service-comms';
import userServices from '../../controllers/user-controllers/index.js';
import { COOKIE_OPTIONS } from '../../constants.js';

// API Function
const logoutUser = async(req, res, next) => {
    try {
        const userId = req.user.userId;

        // Check if user exist
        const isUserAvailable = await userServices.checkUserById(userId);

        if (isUserAvailable.isValid) {
            // Logout user
            const isUserLoggedout = await userServices.logoutUser(userId);

            if (isUserLoggedout.isValid) {
                res.status(responseCodes[isUserLoggedout.resType])
                .clearCookie('accessToken', COOKIE_OPTIONS)
                .clearCookie('refreshToken', COOKIE_OPTIONS)
                .json(
                    new ApiResponse(
                        responseCodes[isUserLoggedout.resType],
                        isUserLoggedout.data,
                        isUserLoggedout.resMsg + ' - ' + responseMessage[isUserLoggedout.resType]
                    )
                );
            } else {
                return next(isUserLoggedout);
            }
        } else {
            return next(isUserAvailable);
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

export default logoutUser;

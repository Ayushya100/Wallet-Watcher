'use strict';

import { ApiResponse, responseCodes, responseMessage } from 'lib-service-comms';
import userServices from '../../controllers/user-controllers/index.js';
import { COOKIE_OPTIONS } from '../../constants.js';

// API Function
const refreshAccessToken = async(req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken || req.body.refreshToken;

        // Check if Token is Available and Active
        const isTokenActive = userServices.isTokenAvailableAndActive(refreshToken);
        
        if (isTokenActive.isValid) {
            // Check if user exists
            const isUserAvailable = await userServices.checkUserById(isTokenActive.data._id);

            if (isUserAvailable.isValid) {
                // Refresh Tokens
                const refreshedTokens = await userServices.refreshTokens(isTokenActive.data._id);

                if (refreshedTokens.isValid) {
                    res.status(responseCodes[refreshedTokens.resType])
                    .cookie('accessToken', refreshedTokens.data.accessToken, COOKIE_OPTIONS)
                    .cookie('refreshToken', refreshedTokens.data.refreshToken, COOKIE_OPTIONS)
                    .json(
                        new ApiResponse(
                            responseCodes[refreshedTokens.resType],
                            refreshedTokens.data,
                            refreshedTokens.resMsg + ' - ' + responseMessage[refreshedTokens.resType]
                        )
                    );
                } else {
                    return next(refreshedTokens);
                }
            } else {
                return next(isUserAvailable);
            }
        } else {
            return next(isTokenActive);
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

export default refreshAccessToken;

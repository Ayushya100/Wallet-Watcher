'use strict';

import { ApiResponse, responseCodes, responseMessage } from 'lib-service-comms';
import userServices from '../../controllers/user-controllers/index.js';

const getUserInfo = async(req, res, next) => {
    try {
        const userId = req.params.id;

        // Check if user exists - return data
        const getUserInfo = await userServices.checkUserById(userId);

        if (getUserInfo.isValid) {
            res.status(responseCodes[getUserInfo.resType]).json(
                new ApiResponse(
                    responseCodes[getUserInfo.resType],
                    getUserInfo.data,
                    responseMessage[getUserInfo.resType]
                )
            );
        } else {
            return next(getUserInfo);
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

export default getUserInfo;

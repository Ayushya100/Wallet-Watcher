'use strict';

import { ApiResponse, responseCodes, responseMessage } from 'lib-service-comms';
import userServices from '../../controllers/user-controllers/index.js';

// API Function
const deleteProfileImage = async(req, res, next) => {
    try {
        const userId = req.params.userId;

        // Check if user exists
        const isUserAvailable = await userServices.checkUserById(userId);

        if (isUserAvailable.isValid) {
            // Delete profile image
            const isImageDeleted = await userServices.deleteProfileImage(isUserAvailable, userId);

            if (isImageDeleted.isValid) {
                res.status(responseCodes[isImageDeleted.resType]).json(
                    new ApiResponse(
                        responseCodes[isImageDeleted.resType],
                        isImageDeleted.data,
                        responseMessage[isImageDeleted.resType] + ' - ' + isImageDeleted.resMsg
                    )
                );
            } else {
                return next(isImageDeleted);
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

export default deleteProfileImage;

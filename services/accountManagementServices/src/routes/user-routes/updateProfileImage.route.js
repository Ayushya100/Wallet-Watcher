'use strict';

import { ApiResponse, responseCodes, responseMessage } from 'lib-service-comms';
import userServices from '../../controllers/user-controllers/index.js';

// API Function
const updateProfileImage = async(req, res, next) => {
    try {
        const userId = req.params.userId;
        const profileImagePath = req.file?.path;

        // Validate Payload
        const isValidPayload = userServices.validateProfileImagePayload(profileImagePath);

        if (isValidPayload.isValid) {
            // Check if user exists
            const isUserAvailable = await userServices.checkUserById(userId);

            if (isUserAvailable.isValid) {
                // Update user image
                const isImageUploaded = await userServices.updateProfileImage(isUserAvailable, userId, profileImagePath);

                if (isImageUploaded.isValid) {
                    res.status(responseCodes[isImageUploaded.resType]).json(
                        new ApiResponse(
                            responseCodes[isImageUploaded.resType],
                            isImageUploaded.data,
                            responseMessage[isImageUploaded.resType] + ' - ' + isImageUploaded.resMsg
                        )
                    );
                } else {
                    return next(isImageUploaded);
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

export default updateProfileImage;

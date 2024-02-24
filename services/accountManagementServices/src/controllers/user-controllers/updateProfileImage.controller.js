'use strict';

import dbConnect from '../../db/index.js';
import { uploadOnCloudinary, destroyOnCloudinary } from '../../utils/index.js';

const updateProfileImage = async(user, userId, imagePath) => {
    try {
        const userCurrentImageURL = user.profileImageURL;

        let cloudinaryImageURL = await uploadOnCloudinary(imagePath);
        cloudinaryImageURL = cloudinaryImageURL.data.url;

        const updatedUserInfo = await dbConnect.updateProfileImage(userId, cloudinaryImageURL);

        if (userCurrentImageURL) {
            await destroyOnCloudinary(userCurrentImageURL);
        }

        return {
            resType: 'REQUEST_COMPLETED',
            resMsg: 'USER IMAGE UPDATED SUCCESSFULLY',
            data: updatedUserInfo,
            isValid: true
        };
    } catch (err) {
        return {
            resType: 'INTERNAL_SERVER_ERROR',
            resMsg: err,
            stack: err.stack,
            isValid: false
        };
    }
}

export {
    updateProfileImage
};

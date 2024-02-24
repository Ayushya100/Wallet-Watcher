'use strict';

import dbConnect from '../../db/index.js';
import { uploadOnCloudinary, destroyOnCloudinary } from '../../utils/index.js';

const deleteImageFromCloudinary = async(userImageURL) => {
    const isImageDeleted = await destroyOnCloudinary(userImageURL);
    return isImageDeleted.isValid;
}

const updateProfileImage = async(user, userId, imagePath) => {
    try {
        const userCurrentImageURL = user.data.profileImageURL;

        let cloudinaryImageURL = await uploadOnCloudinary(imagePath);
        cloudinaryImageURL = cloudinaryImageURL.data.url;

        const updatedUserInfo = await dbConnect.updateProfileImage(userId, cloudinaryImageURL);
        
        if (userCurrentImageURL) {
            await deleteImageFromCloudinary(userCurrentImageURL);
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

const deleteProfileImage = async(user, userId) => {
    try {
        const userCurrentImageURL = user.data.profileImageURL;

        if ((userCurrentImageURL) && (await deleteImageFromCloudinary(userCurrentImageURL))) {
            const updatedUserInfo = await dbConnect.deleteProfileImage(userId);
            return {
                resType: 'REQUEST_COMPLETED',
                resMsg: 'USER IMAGE DELETED SUCCESSFULLY',
                data: updatedUserInfo,
                isValid: true
            };
        }

        return {
            resType: 'BAD_REQUEST',
            resMsg: 'Unable to delete image or image does not exists',
            isValid: false
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
    updateProfileImage,
    deleteProfileImage
};

'use strict';

import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async(localFilePath) => {
    try {
        if (!localFilePath) {
            return {
                resType: 'BAD_REQUEST',
                resMsg: 'FILE NOT FOUND',
                isValid: false
            };
        }

        // Upload the file on cloudinary
        const fileCloudinaryURL = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'image'
        });
        fs.unlinkSync(localFilePath);

        return {
            resType: 'REQUEST_COMPLETED',
            resMsg: 'FILE UPLOADED SUCCESSFULLY',
            data: fileCloudinaryURL,
            isValid: true
        };
    } catch (err) {
        fs.unlinkSync(localFilePath); // delete the local file
        return {
            resType: 'INTERNAL_SERVER_ERROR',
            resMsg: 'SOME ERROR OCCURRED WHILE SAVING IMAGE ON CLOUDINARY',
            isValid: false
        };
    }
}

const getPublicIdFromURL = (URL) => {
    const URLParts = URL.split('/');
    const publicIdWithExtension = URLParts.pop();
    const publicId = publicIdWithExtension.split('.')[0]; // Remove the file extension
    return publicId;
}

const destroyOnCloudinary = async(cloudinaryFilePath) => {
    try {
        if (cloudinaryFilePath) {
            const publicId = getPublicIdFromURL(cloudinaryFilePath);
            await cloudinary.uploader.destroy(publicId);
            return {
                resType: 'SUCCESS',
                resMsg: 'CLOUDINARY IMAGE DESTROYED',
                isValid: true
            };
        }

        return {
            resType: 'BAD_REQUEST',
            resMsg: 'CLOUDINARY URL NOT FOUND',
            isValid: false
        };
    } catch (err) {
        return {
            resType: 'INTERNAL_SERVER_ERROR',
            resMsg: 'SOME ERROR OCCURRED WHILE REMOVING IMAGE ON CLOUDINARY',
            isValid: false
        };
    }
}

export {
    uploadOnCloudinary,
    destroyOnCloudinary
};

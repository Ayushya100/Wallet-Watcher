'use strict';

import emailServices from '../../email/index.js';
import dbConnect from '../../db/index.js';

const updateUserDetails = async(userId, payload) => {
    try {
        const updatedUserInfo = await dbConnect.updateUserInfo(userId, payload);
        emailServices.userDetailsUpdatedSuccessfullyMail(updatedUserInfo);
        
        return {
            resType: 'REQUEST_COMPLETED',
            resMsg: 'User info updated successfully',
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
    updateUserDetails
};

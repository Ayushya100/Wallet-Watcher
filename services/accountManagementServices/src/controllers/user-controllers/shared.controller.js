'use strict';

import dbConnect from '../../db/index.js';

const checkUserById = async(userId) => {
    try {
        const response = {
            resType: 'NOT_FOUND',
            resMsg: 'USER NOT FOUND',
            data: null,
            isValid: false
        };

        const isUserAvailable = await dbConnect.isUserByIdAvailable(userId);

        if (isUserAvailable) {
            response.resType = 'SUCCESS';
            response.resMsg = 'VALIDATION SUCCESSFUL';
            response.data = isUserAvailable;
            response.isValid = true;
        }
        return response;
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
    checkUserById
};

'use strict';

import dbConnect from '../../db/index.js';

const getAllSettings = async() => {
    try {
        const settingDetails = await dbConnect.getAllSettings();

        if (settingDetails.length === 0) {
            return {
                resType: 'CONTENT_NOT_AVAILABLE',
                resMsg: 'No User Available to Assign Setting',
                data: [],
                isValid: false
            };
        }

        return {
            resType: 'SUCCESS',
            resMsg: 'All settings found',
            data: settingDetails,
            isValid: true
        };
    } catch (err) {
        return {
            resType: 'INTERNAL_SERVER_ERROR',
            resMsg: 'Some error occurred while working with db.',
            stack: err.stack,
            isValid: false
        };
    }
}

export {
    getAllSettings
};

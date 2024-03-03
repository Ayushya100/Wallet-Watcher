'use strict';

import dbConnect from '../../db/index.js';

const getAllSettings = async() => {
    try {
        const settingDetails = await dbConnect.getAllSettings();

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

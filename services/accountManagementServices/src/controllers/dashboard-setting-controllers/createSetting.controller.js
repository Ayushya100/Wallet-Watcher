'use strict';

import dbConnect from '../../db/index.js';

const isSettingAvailable = async(payload) => {
    try {
        let response = {
            resType: 'SUCCESS',
            resMsg: 'VALIDATION SUCCESSFULL',
            isValid: true
        };

        const settingDetails = await dbConnect.isSettingByNameAvailable(payload);

        if (settingDetails) {
            response.resType = 'CONFLICT';
            response.resMsg = 'Setting already exists with same name.';
            response.isValid = false;
        }
        return response;
    } catch (err) {
        return {
            resType: 'INTERNAL_SERVER_ERROR',
            resMsg: 'Some error occurred while working with db.',
            stack: err.stack,
            isValid: false
        };
    }
}

const createSetting = async(payload) => {
    try {
        if (!payload.type) {
            payload.type = 'Boolean';
        }

        const newSetting = await dbConnect.createNewSetting(payload);
        return {
            resType: 'REQUEST_COMPLETED',
            resMsg: 'Setting Created Successfully',
            data: newSetting,
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
    isSettingAvailable,
    createSetting
};

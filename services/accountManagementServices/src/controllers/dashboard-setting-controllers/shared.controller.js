'use strict';

import dbConnect from '../../db/index.js';

const isSettingByIdAvailable = async(settingId) => {
    try {
        const settingFound = await dbConnect.isSettingByIdAvailable(settingId);

        if (!settingFound) {
            return {
                resType: 'BAD_REQUEST',
                resMsg: 'Setting does not found',
                isValid: false
            };
        }

        if (settingFound.length === 0) {
            return {
                resType: 'CONTENT_NOT_AVAILABLE',
                resMsg: 'No User Available to Assign Setting',
                data: [],
                isValid: false
            };
        }

        return {
            resType: 'SUCCESS',
            resMsg: 'VALIDATION SUCCESSFULL',
            data: settingFound,
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
    isSettingByIdAvailable
};

'use strict';

import dbConnect from '../../db/index.js';

const updateSettings = async(settingId, payload, settingDetails) => {
    try {
        const settingsPayload = {
            categoryName: payload.categoryName || settingDetails.categoryName,
            categoryDescription: payload.categoryDescription || settingDetails.categoryDescription,
            categoryType: payload.categoryType || settingDetails.categoryType,
            type: payload.type || settingDetails.type,
            isPeriodic: payload.isPeriodic || settingDetails.isPeriodic,
            duration: payload.duration || settingDetails.duration,
            modifiedOn: Date.now(),
            modifiedBy: payload.userId
        };
        const udpatedSettingDetails = await dbConnect.updateSettingDetails(settingId, settingsPayload);

        return {
            resType: 'REQUEST_COMPLETED',
            resMsg: 'Setting Details Updated',
            data: udpatedSettingDetails,
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
    updateSettings
};

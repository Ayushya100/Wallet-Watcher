'use strict';

import dbConnect from '../../db/index.js';

const updateUserDashboardSettings = async(userId, dashboardId, payload) => {
    try {
        if ((payload.type === 'Boolean') && (typeof payload.value != 'boolean')) {
            return {
                resType: 'BAD_REQUEST',
                resMsg: 'Value parameter is not boolean',
                isValid: false
            };
        }
        const updatedDashboardSettings = await dbConnect.updateUserDashboardSetting(userId, dashboardId, payload);

        if (updatedDashboardSettings) {
            return {
                resType: 'SUCCESS',
                resMsg: 'Dashboard settings updated',
                data: updatedDashboardSettings,
                isValid: true
            };
        }
        return {
            resType: 'NOT_FOUND',
            resMsg: 'No Dashboard Setting Found',
            isValid: false
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
    updateUserDashboardSettings
};

'use strict';

import dbConnect from '../../db/index.js';

const getUserDashboardSetting = async(userId) => {
    try {
        const userDashboardSettings = await dbConnect.getDashboardSettingById(userId);

        if (userDashboardSettings) {
            return {
                resType: 'SUCCESS',
                resMsg: 'Dashboard setting details found',
                data: userDashboardSettings,
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
    getUserDashboardSetting
};

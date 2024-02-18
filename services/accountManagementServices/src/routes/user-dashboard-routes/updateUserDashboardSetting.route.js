'use strict';

import { ApiResponse, responseCodes, responseMessage } from 'lib-service-comms';
import dashboardServices from '../../controllers/user-dashboard-controllers/index.js';

// API Function
const updateUserDashboardSettings = async(req, res, next) => {
    try {
        const userId = req.params.userId;
        const dashboardId = req.params.id;
        const payload = req.body;

        // Check if user settings exist
        const isDashboardSettingsFound = await dashboardServices.getUserDashboardSetting(userId);

        if (isDashboardSettingsFound.isValid) {
            const isSettingsUpdated = await dashboardServices.updateUserDashboardSettings(userId, dashboardId, payload);

            if (isSettingsUpdated.isValid) {
                res.status(responseCodes[isSettingsUpdated.resType]).json(
                    new ApiResponse(
                        responseCodes[isSettingsUpdated.resType],
                        isSettingsUpdated.data,
                        isSettingsUpdated.resMsg + ' - ' + responseMessage[isSettingsUpdated.resType]
                    )
                );
            } else {
                return next(isSettingsUpdated);
            }
        } else {
            return next(isDashboardSettingsFound);
        }
    } catch (err) {
        next({
            resType: 'INTERNAL_SERVER_ERROR',
            resMsg: err,
            stack: err.stack,
            isValid: false
        });
    }
}

export default updateUserDashboardSettings;

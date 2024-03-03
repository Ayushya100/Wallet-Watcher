'use strict';

import { ApiResponse, responseCodes, responseMessage } from 'lib-service-comms';
import dashboardSettings from '../../controllers/dashboard-setting-controllers/index.js';

// API Function
const getAllSettings = async(req, res, next) => {
    try {
        const isAllSettingsFound = await dashboardSettings.getAllSettings();

        if (isAllSettingsFound.isValid) {
            res.status(responseCodes[isAllSettingsFound.resType]).json(
                new ApiResponse(
                    responseCodes[isAllSettingsFound.resType],
                    isAllSettingsFound.data,
                    isAllSettingsFound.resMsg + ' - ' + responseMessage[isAllSettingsFound.resType]
                )
            );
        } else {
            return next(isAllSettingsFound);
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

export default getAllSettings;

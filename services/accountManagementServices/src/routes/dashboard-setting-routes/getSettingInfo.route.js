'use strict';

import { ApiResponse, responseCodes, responseMessage } from 'lib-service-comms';
import dashboardSettings from '../../controllers/dashboard-setting-controllers/index.js';

// API Function
const getSettingInfo = async(req, res, next) => {
    try {
        const settingId = req.params.id;
        
        if (!settingId) {
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
        } else {
            const isSettingInfoFound = await dashboardSettings.isSettingByIdAvailable(settingId);

            if (isSettingInfoFound.isValid) {
                res.status(responseCodes[isSettingInfoFound.resType]).json(
                    new ApiResponse(
                        responseCodes[isSettingInfoFound.resType],
                        isSettingInfoFound.data,
                        isSettingInfoFound.resMsg + ' - ' + responseMessage[isSettingInfoFound.resType]
                    )
                );
            } else {
                return next(isSettingInfoFound);
            }
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

export default getSettingInfo;

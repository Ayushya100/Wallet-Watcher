'use strict';

import { ApiResponse, responseCodes, responseMessage } from 'lib-service-comms';
import userServices from '../../controllers/user-controllers/index.js';
import dashboardSettings from '../../controllers/dashboard-setting-controllers/index.js';

// API Function
const updateSetting = async(req, res, next) => {
    try {
        const settingId = req.params.id;
        const payload = req.body;
        
        // Validate Payload
        const isValidPayload = dashboardSettings.validateUpdateSettingPayload(payload);

        if (isValidPayload.isValid) {
            // Is provided user exists
            const isUserExists = await userServices.checkUserById(payload.userId);

            if (isUserExists.isValid) {
                // Check Setting By Id Available
                const isSettingAvailable = await dashboardSettings.isSettingByIdAvailable(settingId);
        
                if (isSettingAvailable.isValid) {
                    // Update Setting Details
                    const isSettingUpdated = await dashboardSettings.updateSettings(settingId, payload, isSettingAvailable.data);
        
                    if (isSettingUpdated.isValid) {
                        res.status(responseCodes[isSettingUpdated.resType]).json(
                            new ApiResponse(
                                responseCodes[isSettingUpdated.resType],
                                isSettingUpdated.data,
                                isSettingUpdated.resMsg + ' - ' + responseMessage[isSettingUpdated.resType]
                            )
                        );
                    } else {
                        return next(isSettingUpdated);
                    }
                } else {
                    return next(isSettingAvailable);
                }
            } else {
                return next(isUserExists);
            }
        } else {
            return next(isValidPayload);
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

export default updateSetting;

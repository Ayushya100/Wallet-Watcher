'use strict';

import { ApiResponse, responseCodes, responseMessage } from 'lib-service-comms';
import dashboardSettings from '../../controllers/dashboard-setting-controllers/index.js';

// API Function
const assignSettingsToUser = async(req, res, next) => {
    try {
        const payload = req.body;

        // Validate Payload
        const isValidPayload = dashboardSettings.validateAssignSettingPayload(payload);

        if (isValidPayload.isValid) {
            // Is setting exists
            const isSettingValid = await dashboardSettings.isSettingByIdAvailable(payload.settingId);

            if (isSettingValid.isValid) {
                // Assign settings to users
                payload.type = isSettingValid.data?.type;
                const isSettingAssigned = await dashboardSettings.assignSettingToUser(payload);
    
                if (isSettingAssigned.isValid) {
                    res.status(responseCodes[isSettingAssigned.resType]).json(
                        new ApiResponse(
                            responseCodes[isSettingAssigned.resType],
                            isSettingAssigned.data,
                            isSettingAssigned.resMsg + ' - ' + responseMessage[isSettingAssigned.resType]
                        )
                    );
                } else {
                    return next(isSettingAssigned);
                }
            } else {
                return next(isSettingValid);
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

export default assignSettingsToUser;

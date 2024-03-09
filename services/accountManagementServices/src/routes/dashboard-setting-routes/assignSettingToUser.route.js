'use strict';

import { ApiResponse, responseCodes, responseMessage } from 'lib-service-comms';
import dashboardServices from '../../controllers/dashboard-setting-controllers/index.js';

// API Function
const assignSettingsToUser = async(req, res, next) => {
    try {
        const settingId = req.params.id;
        const payload = req.body;

        // Validate Payload
        const isValidPayload = dashboardServices.validateAssignSettingPayload(payload);

        if (isValidPayload.isValid) {
            // Is setting exists
            const isSettingValid = await dashboardServices.isSettingByIdAvailable(settingId);

            if (isSettingValid.isValid) {
                // Assign settings to users
                payload.settingId = isSettingValid.data._id || settingId;
                payload.type = isSettingValid.data?.type;
                const isSettingAssigned = await dashboardServices.assignSettingToUser(payload);
    
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

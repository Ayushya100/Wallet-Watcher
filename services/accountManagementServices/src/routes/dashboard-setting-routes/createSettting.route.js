'use string';

import { ApiResponse, responseCodes, responseMessage } from 'lib-service-comms';
import dashboardServices from '../../controllers/dashboard-setting-controllers/index.js';

// API Function
const createSetting = async(req, res, next) => {
    try {
        const payload = req.body;

        const validatePayload = dashboardServices.validateCreateSettingPayload(payload);

        if (validatePayload.isValid) {
            const isSettingAvailable = await dashboardServices.isSettingAvailable(payload);

            if (isSettingAvailable.isValid) {
                const isNewSettingCreated = await dashboardServices.createSetting(payload);
    
                if (isNewSettingCreated.isValid) {
                    res.status(responseCodes[isNewSettingCreated.resType]).json(
                        new ApiResponse(
                            responseCodes[isNewSettingCreated.resType],
                            isNewSettingCreated.data,
                            isNewSettingCreated.resMsg + ' - ' + responseMessage[isNewSettingCreated.resType]
                        )
                    );
                } else {
                    return next(isNewSettingCreated);
                }
            } else {
                return next(isSettingAvailable);
            }
        } else {
            return next(validatePayload);
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

export default createSetting;

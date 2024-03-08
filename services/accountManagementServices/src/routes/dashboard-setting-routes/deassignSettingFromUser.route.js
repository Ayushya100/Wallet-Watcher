'use strict';

import { ApiResponse, responseCodes, responseMessage } from 'lib-service-comms';
import dashboardServices from '../../controllers/dashboard-setting-controllers/index.js';
import userServices from '../../controllers/user-controllers/index.js';

// API Function
const deassignSetting = async(req, res, next) => {
    try {
        const settingId = req.params.id;
        const usersId = req.body.userId;

        // Validate if setting exists
        const isSettingAvailable = await dashboardServices.isSettingByIdAvailable(settingId);

        if (isSettingAvailable.isValid) {
            const isSettingDeassigned = await dashboardServices.deassignSettingFromUser(settingId, usersId);

            if (isSettingDeassigned.isValid) {
                res.status(responseCodes[isSettingDeassigned.resType]).json(
                    new ApiResponse(
                        responseCodes[isSettingDeassigned.resType],
                        isSettingDeassigned.data,
                        isSettingDeassigned.resMsg + ' - ' + responseMessage[isSettingDeassigned.resType]
                    )
                );
            } else {
                return next(isSettingDeassigned);
            }
        } else {
            return next(isSettingAvailable);
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

export default deassignSetting;

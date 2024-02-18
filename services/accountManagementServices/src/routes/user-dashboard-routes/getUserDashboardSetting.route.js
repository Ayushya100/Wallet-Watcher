'use strict';

import { ApiResponse, responseCodes, responseMessage } from 'lib-service-comms';
import userServices from '../../controllers/user-controllers/index.js';
import dashboardServices from '../../controllers/user-dashboard-controllers/index.js';

// API Function
const getUserDashboardSetting = async(req, res, next) => {
    try {
        const userId = req.params.userId;

        // Check user exist or not
        const isUserExist = await userServices.checkUserById(userId);

        if (isUserExist.isValid) {
            const isDashboardSettingsFound = await dashboardServices.getUserDashboardSetting(userId);

            if (isDashboardSettingsFound.isValid) {
                res.status(responseCodes[isDashboardSettingsFound.resType]).json(
                    new ApiResponse(
                        responseCodes[isDashboardSettingsFound.resType],
                        isDashboardSettingsFound.data,
                        isDashboardSettingsFound.resMsg + ' - ' + responseMessage[isDashboardSettingsFound.resType]
                    )
                );
            } else {
                return next(isDashboardSettingsFound);
            }
        } else {
            return next(isUserExist);
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

export default getUserDashboardSetting;

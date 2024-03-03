'use strict';

import { ApiResponse, responseCodes, responseMessage } from 'lib-service-comms';
import accountServices from '../../controllers/investment-account-controllers/index.js';

// API Function
const deactivateAccount = async(req, res, next) => {
    try {
        const userId = req.params.userId;
        const accountToken = req.params.accountToken;
        const accountDetails = req.accountDetails;

        if (accountDetails.isActive) {
            const isAccountDeactivated = await accountServices.deactivateAccount(userId, accountToken);
    
            if (isAccountDeactivated.isValid) {
                res.status(responseCodes[isAccountDeactivated.resType]).json(
                    new ApiResponse(
                        responseCodes[isAccountDeactivated.resType],
                        isAccountDeactivated.data,
                        isAccountDeactivated.resMsg + ' - ' + responseMessage[isAccountDeactivated.resType]
                    )
                );
            } else {
                return next(isAccountDeactivated);
            }
        } else {
            return next({
                resType: 'BAD_REQUEST',
                resMsg: 'Already Deactive Account',
                isValid: false
            });
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

export default deactivateAccount;

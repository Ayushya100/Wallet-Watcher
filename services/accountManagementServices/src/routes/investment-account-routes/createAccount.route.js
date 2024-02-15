'use strict';

import { ApiResponse, responseCodes, responseMessage } from 'lib-service-comms';
import accountServices from '../../controllers/investment-account-controllers/index.js';
import userServices from '../../controllers/user-controllers/index.js';

// API Function
const createAccount = async(req, res, next) => {
    try {
        const userId = req.params.userId;
        const payload = req.body;

        // Validate payload
        const isValidPayload = accountServices.validateNewAccountPayload(payload);

        if (isValidPayload.isValid) {
            // Check user exist or not
            const isUserExist = await userServices.checkUserById(userId);

            if (isUserExist.isValid) {
                // Check if account with same number exists
                const isAccountAvailable = await accountServices.checkAccountByAccNumber(payload.accountNumber);

                if (isAccountAvailable.isValid) {
                    // Create new Account
                    const isAccountCreated = await accountServices.createAccount(userId, payload);

                    if (isAccountCreated.isValid) {
                        res.status(responseCodes[isAccountCreated.resType]).json(
                            new ApiResponse(
                                responseCodes[isAccountCreated.resType],
                                isAccountCreated.data,
                                isAccountCreated.resMsg + ' - ' + responseMessage[isAccountCreated.resType]
                            )
                        );
                    } else {
                        return next(isAccountCreated);
                    }
                } else {
                    return next(isAccountAvailable);
                }
            } else {
                return next(isUserExist);
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

export default createAccount;

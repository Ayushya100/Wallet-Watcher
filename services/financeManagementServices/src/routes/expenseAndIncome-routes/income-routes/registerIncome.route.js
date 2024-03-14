'use strict';

import { ApiResponse, responseCodes, responseMessage } from 'lib-service-comms';
import expAndIncService from '../../../controllers/expenseAndIncome-controllers/index.js';

// API Function
const registerIncome = async(req, res, next) => {
    try {
        const payload = req.body;

        // Verify payload
        const isValidPayload = expAndIncService.verifyRegisterIncomePayload(payload);

        if (isValidPayload.isValid) {
            // Check if user exists
            const isUserAvailable = await expAndIncService.isUserByIdAvailable(payload.userId);

            if (isUserAvailable.isValid) {
                // Check if Category exists
                const isCategoryAvailable = await expAndIncService.isCategoryByIdAvailable(payload.userId, payload.incomeCategoryId, 'INCOME');

                if (isCategoryAvailable.isValid) {
                    // Check if Card exists
                    const isCardAvailable = await expAndIncService.isCardByTokenAvailable(payload.userId, payload.cardToken);

                    if (isCardAvailable.isValid) {
                        // Register Income
                        payload.cardCurrentBalance = isCardAvailable.data.balance;
                        const incomeDetails = await expAndIncService.incomeServices.registerIncome(payload);

                        if (incomeDetails.isValid) {
                            res.status(responseCodes[incomeDetails.resType]).json(
                                new ApiResponse(
                                    responseCodes[incomeDetails.resType],
                                    incomeDetails.data,
                                    incomeDetails.resMsg + ' - ' + responseMessage[incomeDetails.resType]
                                )
                            );
                        } else {
                            return next(incomeDetails);
                        }
                    } else {
                        return next(isCardAvailable);
                    }
                } else {
                    return next(isCategoryAvailable);
                }
            } else {
                return next(isUserAvailable);
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

export default registerIncome;

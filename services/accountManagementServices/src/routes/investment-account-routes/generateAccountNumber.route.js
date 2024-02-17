'use strict';

import { ApiResponse, responseCodes, responseMessage } from 'lib-service-comms';
import accountServices from '../../controllers/investment-account-controllers/index.js';

// API Function
const generateAccountNumber = async(req, res, next) => {
    try {
        const accountNumber = await accountServices.generateAccountNumber();

        if (accountNumber) {
            res.status(responseCodes[accountNumber.resType]).json(
                new ApiResponse(
                    responseCodes[accountNumber.resType],
                    accountNumber.data,
                    accountNumber.resMsg + ' - ' + responseMessage[accountNumber.resType]
                )
            );
        } else {
            return next(accountNumber);
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

export default generateAccountNumber;

'use strict';

import { ApiResponse, responseCodes, responseMessage } from 'lib-service-comms';
import cardServices from '../../controllers/card-controllers/index.js';

// API Function
const generateCardNumber = async(req, res, next) => {
    try {
        const cardNumber = await cardServices.generateCardNumber();
        
        if (cardNumber) {
            res.status(responseCodes[cardNumber.resType]).json(
                new ApiResponse(
                    responseCodes[cardNumber.resType],
                    cardNumber.data,
                    cardNumber.resMsg + ' - ' + responseMessage[cardNumber.resType]
                )
            );
        } else {
            return next(cardNumber);
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

export default generateCardNumber;

'use strict';

import { ApiResponse, responseCodes, responseMessage } from 'lib-service-comms';
import cardServices from '../../controllers/card-controllers/index.js';

// API Function
const deactivateCard = async(req, res, next) => {
    try {
        const userId = req.params.userId;
        const cardToken = req.params.cardToken;
        const cardDetails = req.cardDetails;

        if (cardDetails.isActive) {
            const isCardDeactivated = await cardServices.deactivateCard(userId, cardToken);
    
            if (isCardDeactivated.isValid) {
                res.status(responseCodes[isCardDeactivated.resType]).json(
                    new ApiResponse(
                        responseCodes[isCardDeactivated.resType],
                        isCardDeactivated.data,
                        isCardDeactivated.resMsg + ' - ' + responseMessage[isCardDeactivated.resType]
                    )
                );
            } else {
                return next(isCardDeactivated);
            }
        } else {
            return next({
                resType: 'BAD_REQUEST',
                resMsg: 'Already Deactive Card',
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

export default deactivateCard;

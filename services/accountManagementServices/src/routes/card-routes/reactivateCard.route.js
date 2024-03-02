'use strict';

import { ApiResponse, responseCodes, responseMessage } from 'lib-service-comms';
import cardServices from '../../controllers/card-controllers/index.js';

// API Function
const reactivateCard = async(req, res, next) => {
    try {
        const userId = req.params.userId;
        const cardToken = req.params.cardToken;
        const cardDetails = req.cardDetails;

        if (!cardDetails.isActive) {
            // Check if card already expired
            const isCardValidToReactivate = cardServices.isCardValidToReactivate(cardDetails);
    
            if (isCardValidToReactivate.isValid) {
                const isCardReactivated = await cardServices.reactivateCard(userId, cardToken);
    
                if (isCardReactivated.isValid) {
                    res.status(responseCodes[isCardReactivated.resType]).json(
                        new ApiResponse(
                            responseCodes[isCardReactivated.resType],
                            isCardReactivated.data,
                            isCardReactivated.resMsg + ' - ' + responseMessage[isCardReactivated.resType]
                        )
                    );
                } else {
                    return next(isCardReactivated);
                }     
            } else {
                return next(isCardValidToReactivate);
            }
        } else {
            return next({
                resType: 'BAD_REQUEST',
                resMsg: 'Already Active Card',
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

export default reactivateCard;

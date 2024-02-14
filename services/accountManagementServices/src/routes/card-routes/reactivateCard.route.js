'use strict';

import { ApiResponse, responseCodes, responseMessage } from 'lib-service-comms';
import cardServices from '../../controllers/card-controllers/index.js';

// API Function
const reactivateCard = async(req, res, next) => {
    try {
        const userId = req.params.userId;
        const cardId = req.params.id;

        // Check if card exist
        const isCardAvailable = await cardServices.isCardByIdExist(userId, cardId);

        if (isCardAvailable.isValid) {
            // Check if card already expired
            const isCardValidToReactivate = cardServices.isCardValidToReactivate(isCardAvailable);

            if (isCardValidToReactivate.isValid) {
                const isCardReactivated = await cardServices.reactivateCard(userId, cardId);

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
            return next(isCardAvailable);
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

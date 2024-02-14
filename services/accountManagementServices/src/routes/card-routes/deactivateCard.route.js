'use strict';

import { ApiResponse, responseCodes, responseMessage } from "lib-service-comms";
import cardServices from '../../controllers/card-controllers/index.js';

// API Function
const deactivateCard = async(req, res, next) => {
    try {
        const userId = req.params.userId;
        const cardId = req.params.id;

        // Check if card exist
        const isCardAvailable = await cardServices.isCardByIdExist(userId, cardId);

        if (isCardAvailable.isValid) {
            const isCardDeactivated = await cardServices.deactivateCard(userId, cardId);

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
            return next(isCardAvailable);
        }
    } catch (err) {
        return {
            resType: 'INTERNAL_SERVER_ERROR',
            resMsg: err,
            stack: err.stack,
            isValid: false
        };
    }
}

export default deactivateCard;
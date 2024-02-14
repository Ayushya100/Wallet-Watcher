'use strict';

import { ApiResponse, responseCodes, responseMessage } from 'lib-service-comms';
import cardServices from '../../controllers/card-controllers/index.js';

const updateCardInfo = async(req, res, next) => {
    try {
        const userId = req.params.userId;
        const cardId = req.params.id;
        const payload = req.body;

        // Validate Payload
        const isValidPayload = await cardServices.validateUpdateCardPayload(payload);

        if (isValidPayload.isValid) {
            // Check if card details exist
            const isCardAvailable = await cardServices.isCardByIdExist(userId, cardId);
    
            if (isCardAvailable.isValid) {
                const isCardDetailsUpdated = await cardServices.updateCardinfo(userId, cardId, payload);
    
                if (isCardDetailsUpdated.isValid) {
                    res.status(responseCodes[isCardDetailsUpdated.resType]).json(
                        new ApiResponse(
                            responseCodes[isCardDetailsUpdated.resType],
                            isCardDetailsUpdated.data,
                            isCardDetailsUpdated.resMsg + ' - ' + responseMessage[isCardDetailsUpdated.resType]
                        )
                    );
                } else {
                    return next(isCardDetailsUpdated);
                }
            } else {
                return next(isCardAvailable);
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

export default updateCardInfo;

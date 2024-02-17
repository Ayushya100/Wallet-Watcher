'use strict';

import { ApiResponse, responseCodes, responseMessage } from 'lib-service-comms';
import cardServices from '../../controllers/card-controllers/index.js';

// API Function
const deleteCard = async(req, res, next) => {
    try {
        const userId = req.params.userId;
        const cardId = req.params.id;

        const isCardDeleted = await cardServices.deleteCard(userId, cardId);

        if (isCardDeleted.isValid) {
            res.status(responseCodes[isCardDeleted.resType]).json(
                new ApiResponse(
                    responseCodes[isCardDeleted.resType],
                    isCardDeleted.data,
                    isCardDeleted.resMsg + ' - ' + responseMessage[isCardDeleted.resType]
                )
            );
        } else {
            return next(isCardDeleted);
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

export default deleteCard;

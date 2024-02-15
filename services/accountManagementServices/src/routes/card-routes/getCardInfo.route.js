'use strict';

import { ApiResponse, responseCodes, responseMessage } from 'lib-service-comms';
import cardServices from '../../controllers/card-controllers/index.js';

// API Function
const getCardInfo = async(req, res, next) => {
    try {
        const userId = req.params.userId;
        const cardId = req.params.id;
        
        if (cardId) {
            const getOneCardInfo = await cardServices.getCardByIdInfo(userId, cardId);

            if (getOneCardInfo.isValid) {
                res.status(responseCodes[getOneCardInfo.resType]).json(
                    new ApiResponse(
                        responseCodes[getOneCardInfo.resType],
                        getOneCardInfo.data,
                        getOneCardInfo.resMsg + ' - ' + responseMessage[getOneCardInfo.resType]
                    )
                );
            } else {
                return next(getOneCardInfo);
            }
        } else {
            const getAllCardInfo = await cardServices.getAllCardsInfo(userId);

            if (getAllCardInfo.isValid) {
                res.status(responseCodes[getAllCardInfo.resType]).json(
                    new ApiResponse(
                        responseCodes[getAllCardInfo.resType],
                        getAllCardInfo.data,
                        getAllCardInfo.resMsg + ' - ' + responseMessage[getAllCardInfo.resType]
                    )
                );
            } else {
                return next(getAllCardInfo);
            }
        }
    } catch (err) {
        next({
            resType: 'INTERNAL_SERVER_ERROR',
            resMsg: err,
            stack: err.stack,
            isValid: false
        });
    }
};

export default getCardInfo;

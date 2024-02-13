'use strict';

import { ApiResponse, responseCodes, responseMessage } from 'lib-service-comms';
import cardServices from '../../controllers/card-controllers/index.js';
import userServices from '../../controllers/user-controllers/index.js';

// API Function
const registerCard = async(req, res, next) => {
    try {
        const userId = req.params.userId;
        const payload = req.body;

        // Validate Payload
        const isValidPayload = cardServices.validateRegisterCardPayload(payload);

        if (isValidPayload.isValid) {
            // Check user exist or not
            const isUserExist = await userServices.checkUserById(userId);

            if (isUserExist.isValid) {
                // Check card already exist
                const isCardExist = await cardServices.checkCardByCardNumber(payload.cardNumber);

                if (isCardExist.isValid) {
                    // Register new card
                    const isCardRegistered = await cardServices.registerNewCard(userId, payload);

                    if (isCardRegistered.isValid) {
                        res.status(responseCodes[isCardRegistered.resType]).json(
                            new ApiResponse(
                                responseCodes[isCardRegistered.resType],
                                isCardRegistered.data,
                                isCardRegistered.resMsg + ' - ' + responseMessage[isCardRegistered.resType]
                            )
                        );
                    } else {
                        return next(isCardRegistered);
                    }
                } else {
                    return next(isCardExist);
                }
            } else {
                return next(isUserExist);
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
};

export default registerCard;

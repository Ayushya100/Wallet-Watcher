'use strict';

import dbConnect from '../../db/index.js';

const isCardValidToReactivate = (card) => {
    let response = {
        resType: 'SUCCESS',
        resMsg: 'VALIDATION SUCCESSFULL',
        isValid: true
    };

    if (card.data.expirationDate < new Date()) {
        response.resType = 'BAD_REQUEST';
        response.resMsg = 'CARD ALREADY EXPIRED - CANNOT RE-ACTIVATE';
        response.isValid = false;
    }

    return response;
}

const reactivateCard = async(userId, cardId) => {
    try {
        const updatedCardInfo = await dbConnect.reactivateCard(userId, cardId);

        return {
            resType: 'REQUEST_COMPLETED',
            resMsg: 'Card Reactivated Successfully',
            data: updatedCardInfo,
            isValid: true
        };
    } catch (err) {
        return {
            resType: 'INTERNAL_SERVER_ERROR',
            resMsg: 'Some error occurred while working with db.',
            stack: err.stack,
            isValid: false
        };
    }
}

export {
    isCardValidToReactivate,
    reactivateCard
};

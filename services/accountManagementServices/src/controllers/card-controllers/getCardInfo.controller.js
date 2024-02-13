'use strict';

import dbConnect from '../../db/index.js';

const getAllCardsInfo = async(userId) => {
    try {
        const allCardInfo = await dbConnect.getAllCardInfo(userId);

        if (allCardInfo.length > 0) {
            return {
                resType: 'REQUEST_ACCEPTED',
                resMsg: 'Card details found',
                data: allCardInfo,
                isValid: true
            };
        }
        return {
            resType: 'NOT_FOUND',
            resMsg: 'No Card Found',
            isValid: false
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

const getCardByIdInfo = async(userId, cardId) => {
    try {
        const oneCardInfo = await dbConnect.getCardInfoById(userId, cardId);

        if (oneCardInfo) {
            return {
                resType: 'REQUEST_ACCEPTED',
                resMsg: 'Card details found',
                data: oneCardInfo,
                isValid: true
            };
        }
        return {
            resType: 'NOT_FOUND',
            resMsg: 'No Card Found',
            isValid: false
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
    getAllCardsInfo,
    getCardByIdInfo
};

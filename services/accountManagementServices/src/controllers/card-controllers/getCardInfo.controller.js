'use strict';

import dbConnect from '../../db/index.js';
import { decryptData, convertDateToString } from '../../utils/index.js';

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

const getCardInfoByToken = async(userId, cardToken) => {
    try {
        let oneCardInfo = await dbConnect.getCardInfoById(userId, cardToken);

        oneCardInfo.cardType = decryptData(oneCardInfo.cardType);
        oneCardInfo.bankInfo = decryptData(oneCardInfo.bankInfo);
        oneCardInfo.expirationDate = decryptData(oneCardInfo.expirationDate);
        oneCardInfo.holderName = decryptData(oneCardInfo.holderName);

        oneCardInfo.expirationDate = convertDateToString(oneCardInfo.expirationDate);

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
    getCardInfoByToken
};

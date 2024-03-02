'use strict';

import dbConnect from '../../db/index.js';
import emailServices from '../../email/index.js';
import { decryptData, convertFullDateToString } from '../../utils/card.js';

const isCardValidToReactivate = (cardDetails) => {
    let response = {
        resType: 'SUCCESS',
        resMsg: 'VALIDATION SUCCESSFULL',
        isValid: true
    };

    let expirationDate = decryptData(cardDetails.expirationDate);
    expirationDate = convertFullDateToString(expirationDate);
    expirationDate = new Date(expirationDate);

    if (expirationDate < new Date()) {
        response.resType = 'BAD_REQUEST';
        response.resMsg = 'CARD ALREADY EXPIRED - CANNOT RE-ACTIVATE';
        response.isValid = false;
    }

    return response;
}

const reactivateCard = async(userId, cardToken) => {
    try {
        const updatedCardInfo = await dbConnect.reactivateCard(userId, cardToken);
        updatedCardInfo.holderName = decryptData(updatedCardInfo.holderName);
        updatedCardInfo.expirationDate = decryptData(updatedCardInfo.expirationDate);

        const userInfo = await dbConnect.isUserByIdAvailable(userId);

        const emailPayload = {
            fullName: userInfo.firstName + ' ' + userInfo.lastName,
            emailId: userInfo.emailId,
            cardNumber: updatedCardInfo.cardNumber
        };
        emailServices.sendCardReactivationMail(emailPayload);

        return {
            resType: 'REQUEST_COMPLETED',
            resMsg: 'Card Reactivated Successfully',
            data:  {
                cardNumber: updatedCardInfo.cardNumber,
                holderName: updatedCardInfo.holderName,
                cardColor: updatedCardInfo.cardColor,
                isActive: updatedCardInfo.isActive
            },
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

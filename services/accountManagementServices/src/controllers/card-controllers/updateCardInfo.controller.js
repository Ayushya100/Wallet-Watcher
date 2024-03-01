'use strict';

import dbConnect from '../../db/index.js';
import emailServices from '../../email/index.js';
import { encryptData, decryptData, convertDateToString } from '../../utils/card.js';

const updateCardinfo = async(userId, cardToken, payload) => {
    try {
        payload.holderName = encryptData(String(payload.holderName));

        let updatedCardInfo = await dbConnect.updateExistingCard(userId, cardToken, payload);
        updatedCardInfo.holderName = decryptData(updatedCardInfo.holderName);
        updatedCardInfo.expirationDate = decryptData(updatedCardInfo.expirationDate);

        const expirationDate = convertDateToString(updatedCardInfo.expirationDate);
        const userInfo = await dbConnect.isUserByIdAvailable(userId);

        const emailPayload = {
            fullName: userInfo.firstName + ' ' + userInfo.lastName,
            emailId: userInfo.emailId,
            cardNumber: updatedCardInfo.cardNumber,
            expirationDate: expirationDate,
            holderName: updatedCardInfo.holderName
        };
        emailServices.sendCardUpdatedMail(emailPayload);
        
        return {
            resType: 'REQUEST_COMPLETED',
            resMsg: 'Card Info Updated',
            data: {
                cardNumber: updatedCardInfo.cardNumber,
                holderName: updatedCardInfo.holderName,
                cardColor: updatedCardInfo.cardColor,
                balance: updatedCardInfo.balance,
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
    updateCardinfo
};

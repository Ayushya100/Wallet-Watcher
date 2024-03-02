'use strict';

import dbConnect from '../../db/index.js';
import emailServices from '../../email/index.js';
import { decryptData } from '../../utils/card.js';

const deleteCard = async(userId, cardToken) => {
    try {
        const updatedCardInfo = await dbConnect.deleteCard(userId, cardToken);
        updatedCardInfo.holderName = decryptData(updatedCardInfo.holderName);
        updatedCardInfo.expirationDate = decryptData(updatedCardInfo.expirationDate);

        const userInfo = await dbConnect.isUserByIdAvailable(userId);

        const emailPayload = {
            fullName: userInfo.firstName + ' ' + userInfo.lastName,
            emailId: userInfo.emailId,
            cardNumber: updatedCardInfo.cardNumber
        };
        emailServices.sendCardDeletionMail(emailPayload);

        return {
            resType: 'REQUEST_COMPLETED',
            resMsg: 'Card Deleted Successfully',
            data: {
                cardNumber: updatedCardInfo.cardNumber,
                holderName: updatedCardInfo.holderName,
                cardColor: updatedCardInfo.cardColor,
                isActive: updatedCardInfo.isActive,
                isDeleted: updatedCardInfo.isDeleted
            },
            isValid: true
        };
    } catch(err) {
        return {
            resType: 'INTERNAL_SERVER_ERROR',
            resMsg: 'Some error occurred while working with db.',
            stack: err.stack,
            isValid: false
        };
    }
}

export {
    deleteCard
};

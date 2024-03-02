'use strict';

import dbConnect from '../../db/index.js';
import emailServices from '../../email/index.js';
import { decryptData } from '../../utils/card.js';

const deactivateCard = async(userId, cardToken) => {
    try {
        const updatedCardInfo = await dbConnect.deactivateCard(userId, cardToken);
        updatedCardInfo.holderName = decryptData(updatedCardInfo.holderName);
        updatedCardInfo.expirationDate = decryptData(updatedCardInfo.expirationDate);

        const userInfo = await dbConnect.isUserByIdAvailable(userId);

        const emailPayload = {
            fullName: userInfo.firstName + ' ' + userInfo.lastName,
            emailId: userInfo.emailId,
            cardNumber: updatedCardInfo.cardNumber
        };
        emailServices.sendCardDeactivatedMail(emailPayload);

        return {
            resType: 'REQUEST_COMPLETED',
            resMsg: 'Card Deactivated Successfully',
            data: {
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
    deactivateCard
};

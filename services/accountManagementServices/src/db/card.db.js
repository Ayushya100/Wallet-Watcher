'use strict';

import mongoose from 'mongoose';

// Add DB Model
import { cardInfoModel } from 'lib-service-comms';

const Card = cardInfoModel(mongoose);

const isCardByCardNumberAvailable = async(cardNumber) => {
    const cardInfo = await Card.findOne({
        cardNumber: cardNumber
    });
    return cardInfo;
}

const createNewCard = async(userId, payload) => {
    const newCard = await Card.create({
        userId: userId,
        cardNumber: payload.cardNumber,
        cardType: payload.cardType,
        bankInfo: payload.bankInfo,
        expirationDate: payload.expirationDate,
        holderName: payload.holderName,
        cardColor: payload.cardColor
    });
    return newCard;
}

export {
    isCardByCardNumberAvailable,
    createNewCard
};

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
        cardColor: payload.cardColor,
        balance: payload.balance || 0
    });
    return newCard;
}

const getAllCardInfo = async(userId) => {
    const cardInfo = await Card.find(
        {
            userId: userId,
            isDeleted: false
        }
    ).select(
        'cardNumber cardType bankInfo expirationDate holderName cardColor isActive'
    );
    return cardInfo;
}

const getCardInfoById = async(userId, cardId) => {
    const cardInfo = await Card.findOne(
        {
            _id: cardId,
            userId: userId,
            isDeleted: false
        }
    ).select(
        'cardNumber cardType bankInfo expirationDate holderName cardColor isActive balance'
    );
    return cardInfo;
}

export {
    isCardByCardNumberAvailable,
    createNewCard,
    getAllCardInfo,
    getCardInfoById
};

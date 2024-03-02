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
        token: payload.token,
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
        'token cardNumber cardType bankInfo expirationDate holderName cardColor isActive'
    );
    return cardInfo;
}

const getCardInfoByToken = async(userId, cardToken) => {
    const cardInfo = await Card.findOne(
        {
            token: cardToken,
            userId: userId,
            isDeleted: false
        }
    ).select(
        'cardNumber cardType bankInfo expirationDate holderName cardColor isActive balance isDeleted'
    );
    return cardInfo;
}

const updateExistingCard = async(userId, cardToken, payload) => {
    const existingCardInfo = await getCardInfoByToken(userId, cardToken);
    const updatedCardInfo = await Card.findOneAndUpdate(
        {
            token: cardToken,
            userId: userId,
            isDeleted: false
        },
        {
            $set: {
                holderName: payload.holderName || existingCardInfo.holderName,
                cardColor: payload.cardColor || existingCardInfo.cardColor,
                modifiedOn: Date.now(),
                modifiedBy: userId
            }
        },
        {
            new: true
        }
    ).select(
        'cardNumber cardType bankInfo expirationDate holderName cardColor isActive'
    );
    return updatedCardInfo;
}

const deactivateCard = async(userId, cardToken) => {
    const updatedCardInfo = await Card.findOneAndUpdate(
        {
            token: cardToken,
            userId: userId
        },
        {
            $set: {
                isActive: false,
                modifiedOn: Date.now(),
                modifiedBy: userId
            }
        },
        {
            new: true
        }
    ).select(
        'cardNumber cardType bankInfo expirationDate holderName cardColor isActive'
    );
    return updatedCardInfo;
}

const reactivateCard = async(userId, cardToken) => {
    const updatedCardInfo = await Card.findOneAndUpdate(
        {
            token: cardToken,
            userId: userId
        },
        {
            $set: {
                isActive: true,
                modifiedOn: Date.now(),
                modifiedBy: userId
            }
        },
        {
            new: true
        }
    ).select(
        'cardNumber cardType bankInfo expirationDate holderName cardColor isActive'
    );
    return updatedCardInfo;
}

const deleteCard = async(userId, cardToken) => {
    const updatedCardInfo = await Card.findOneAndUpdate(
        {
            token: cardToken,
            userId: userId
        },
        {
            $set: {
                isActive: false,
                isDeleted: true,
                modifiedOn: Date.now(),
                modifiedBy: userId
            }
        },
        {
            new: true
        }
    ).select(
        'cardNumber cardType bankInfo expirationDate holderName cardColor isActive isDeleted'
    );
    return updatedCardInfo;
}

export {
    isCardByCardNumberAvailable,
    createNewCard,
    getAllCardInfo,
    getCardInfoByToken,
    updateExistingCard,
    deactivateCard,
    reactivateCard,
    deleteCard
};

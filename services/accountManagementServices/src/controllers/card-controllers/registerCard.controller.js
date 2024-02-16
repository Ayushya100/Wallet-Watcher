'use strict';

import dbConnect from '../../db/index.js';

// Check for existing card with same card number
const checkCardByCardNumber = async(cardNumber) => {
    try {
        let response = {
            resType: 'SUCCESS',
            resMsg: 'VALIDATION SUCCESSFULL',
            isValid: true
        };
    
        const isCardExist = await dbConnect.isCardByCardNumberAvailable(cardNumber);
        if (isCardExist) {
            response.resType = 'CONFLICT';
            response.resMsg = 'Card already exists with same number.';
            response.isValid = false;
        }
        return response;
    } catch(err) {
        return {
            resType: 'INTERNAL_SERVER_ERROR',
            resMsg: 'Some error occurred while working with db.',
            stack: err.stack,
            isValid: false
        };
    }
}

// Register new card
const registerNewCard = async(userId, payload) => {
    try {
        payload.cardType = payload.cardType.toUpperCase();

        const [year, month] = payload.expirationDate.split('-').map(Number);
        const lastDateOfMonth = new Date(year, month, 0);
        lastDateOfMonth.setHours(23, 59, 59, 999);
        payload.expirationDate = lastDateOfMonth;

        const newCard = await dbConnect.createNewCard(userId, payload);

        if (newCard) {
            return {
                resType: 'REQUEST_COMPLETED',
                resMsg: 'Card created successfully',
                data: newCard,
                isValid: true
            };
        }
        return {
            resType: 'INTERNAL_SERVER_ERROR',
            resMsg: 'CARD CREATION FAILED. INTERNAL ERROR OCCURRED',
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
    checkCardByCardNumber,
    registerNewCard
};

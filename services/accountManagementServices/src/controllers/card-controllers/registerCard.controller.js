'use strict';

import dbConnect from '../../db/index.js';
import emailServices from '../../email/index.js';
import { 
    maskCardNumber,
    generateToken,
    encryptData 
} from '../../utils/index.js';

// Check for existing card with same card number
const checkCardByCardNumber = async(cardNumber) => {
    try {
        let response = {
            resType: 'SUCCESS',
            resMsg: 'VALIDATION SUCCESSFULL',
            isValid: true
        };
    
        const maskedCardNumber = maskCardNumber(cardNumber);
        const isCardExist = await dbConnect.isCardByCardNumberAvailable(maskedCardNumber);
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

        const expirationDate = payload.expirationDate;
        const [year, month] = payload.expirationDate.split('-').map(Number);
        const lastDateOfMonth = new Date(year, month, 0);
        lastDateOfMonth.setHours(23, 59, 59, 999);
        payload.expirationDate = lastDateOfMonth;

        const userInfo = await dbConnect.isUserByIdAvailable(userId);

        const emailPayload = {
            fullName: userInfo.firstName + ' ' + userInfo.lastName,
            emailId: userInfo.emailId,
            bankInfo: payload.bankInfo,
            expirationDate: expirationDate,
            holderName: payload.holderName
        };

        const maskedCardNumber = maskCardNumber(payload.cardNumber);
        payload.cardNumber = maskedCardNumber;
        payload.token = generateToken(maskedCardNumber);
        payload.cardType = encryptData(String(payload.cardType));
        payload.bankInfo = encryptData(String(payload.bankInfo));
        payload.expirationDate = encryptData(String(payload.expirationDate));
        payload.holderName = encryptData(String(payload.holderName));
        
        const newCard = await dbConnect.createNewCard(userId, payload);

        if (newCard) {
            emailPayload.cardNumber = maskedCardNumber;
            emailServices.sendCardRegistrationMail(emailPayload);

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

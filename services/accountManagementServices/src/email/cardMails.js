'use strict';

import sendMail from './sendMails.js';

const sendCardRegistrationMail = (payload) => {
    const mailOptions = {
        from: 'Wallet watcher',
        to: payload.emailId,
        subject: 'Confirmation: New Card Registration',
        template: 'registerNewCardMail',
        context: {
            fullName: payload.fullName,
            cardNumber: payload.cardNumber,
            bankInfo: payload.bankInfo,
            holderName: payload.holderName,
            expirationDate: payload.expirationDate,
            custContactEmailId: process.env.EMAIL_USER
        }
    };

    sendMail(payload.emailId, mailOptions);
}

const sendCardUpdatedMail = (payload) => {
    const mailOptions = {
        from: 'Wallet watcher',
        to: payload.emailId,
        subject: 'Update: Card Details Successfully Updated',
        template: 'updateCardDetailsMail',
        context: {
            fullName: payload.fullName,
            cardNumber: payload.cardNumber,
            expirationDate: payload.expirationDate,
            holderName: payload.holderName,
            custContactEmailId: process.env.EMAIL_USER
        }
    };

    sendMail(payload.emailId, mailOptions);
}

const sendCardDeactivatedMail = (payload) => {
    const mailOptions = {
        from: 'Wallet watcher',
        to: payload.emailId,
        subject: 'Confirmation: Card Deactivation Request Processed',
        template: 'cardDeactivatedMail',
        context: {
            fullName: payload.fullName,
            cardNumber: payload.cardNumber,
            custContactEmailId: process.env.EMAIL_USER
        }
    };

    sendMail(payload.emailId, mailOptions);
}

const sendCardReactivationMail = (payload) => {
    const mailOptions = {
        from: 'Wallet watcher',
        to: payload.emailId,
        subject: 'Confirmation: Card Reactivation Request Processed',
        template: 'cardReactivatedMail',
        context: {
            fullName: payload.fullName,
            cardNumber: payload.cardNumber,
            custContactEmailId: process.env.EMAIL_USER
        }
    };

    sendMail(payload.emailId, mailOptions);
}

export {
    sendCardRegistrationMail,
    sendCardUpdatedMail,
    sendCardDeactivatedMail,
    sendCardReactivationMail
};

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

export {
    sendCardRegistrationMail
};

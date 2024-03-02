'use strict';

import sendMail from './sendMails.js';

const sendAccountRegistrationMail = (payload) => {
    const mailOptions = {
        from: 'Wallet watcher',
        to: payload.emailId,
        subject: 'Welcome to Your New Investment Account!',
        template: 'registerNewAccountMail',
        context: {
            fullName: payload.fullName,
            accountName: payload.accountName,
            accountNumber: payload.accountNumber,
            holderName: payload.holderName,
            accountDate: payload.accountDate,
            custContactEmailId: process.env.EMAIL_USER
        }
    };

    sendMail(payload.emailId, mailOptions);
}

export {
    sendAccountRegistrationMail
};

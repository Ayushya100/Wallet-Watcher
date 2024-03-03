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

const sendAccountUpdatedMail = (payload) => {
    const mailOptions = {
        from: 'Wallet watcher',
        to: payload.emailId,
        subject: 'Update: Investment Account Details Successfully Updated',
        template: 'updateAccountDetailsMail',
        context: {
            fullName: payload.fullName,
            accountNumber: payload.accountNumber,
            holderName: payload.holderName,
            accountDate: payload.accountDate,
            custContactEmailId: process.env.EMAIL_USER
        }
    };

    sendMail(payload.emailId, mailOptions);
}

const sendAccountDeactivationMail = (payload) => {
    const mailOptions = {
        from: 'Wallet watcher',
        to: payload.emailId,
        subject: 'Account Deactivation Confirmation',
        template: 'invAccountDeactivatedMail',
        context: {
            fullName: payload.fullName,
            accountNumber: payload.accountNumber,
            custContactEmailId: process.env.EMAIL_USER
        }
    };

    sendMail(payload.emailId, mailOptions);
}

const sendAccountReactivationMail = (payload) => {
    const mailOptions = {
        from: 'Wallet watcher',
        to: payload.emailId,
        subject: 'Account Reactivation Confirmation',
        template: 'invAccountReactivatedMail',
        context: {
            fullName: payload.fullName,
            accountNumber: payload.accountNumber,
            custContactEmailId: process.env.EMAIL_USER
        }
    };

    sendMail(payload.emailId, mailOptions);
}

export {
    sendAccountRegistrationMail,
    sendAccountUpdatedMail,
    sendAccountDeactivationMail,
    sendAccountReactivationMail
};

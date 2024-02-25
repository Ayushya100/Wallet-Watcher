'use strict';

import transporter from './emailConnection.js';
import { FRONTEND_URL } from '../constants.js';

const sendMail = (emailId, mailOptions) => {
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`Email has been sent to: ${emailId}`);
        }
    });
}

const sendVerificationMail = (custId, emailId, fullName, verificationCode) => {
    const mailOptions = {
        from: 'Wallet watcher',
        to: emailId,
        subject: 'Welcome to Wallet watcher - Verify Your Email and Activate Your Account',
        template: 'userVerificationMail',
        context: {
            fullName: fullName,
            verificationCode: FRONTEND_URL + '/verify-user/' + custId + '/' + Date.now() + '/' + verificationCode,
            custContactEmailId: process.env.EMAIL_USER
        }
    };

    sendMail(emailId, mailOptions);
}

const sendVerificationSuccessfulMail = (userInfo) => {
    const mailOptions = {
        from: 'Wallet watcher',
        to: userInfo.emailId,
        subject: 'Account Verified - Welcome to Wallet watcher',
        template: 'verificationSuccessfulMail',
        context: {
            fullName: userInfo.firstName + ' ' + userInfo.lastName,
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            userName: userInfo.userName,
            contactNumber: userInfo.contactNumber,
            emailId: userInfo.emailId,
            custContactEmailId: process.env.EMAIL_USER
        }
    };

    sendMail(userInfo.emailId, mailOptions);
}

const accountReactivatedMail = (emailId, fullName) => {
    const mailOptions = {
        from: 'Wallet watcher',
        to: emailId,
        subject: 'Welcome Back! Your Account is Reactivated.',
        template: 'accountReactivateMail',
        context: {
            fullName: fullName,
            custContactEmailId: process.env.EMAIL_USER
        }
    };

    sendMail(emailId, mailOptions);
}

const userDetailsUpdatedSuccessfullyMail = (userInfo) => {
    const mailOptions = {
        from: 'Wallet watcher',
        to: userInfo.emailId,
        subject: 'Account Details Successfully Updated',
        template: 'userUpdatedMail',
        context: {
            fullName: userInfo.firstName + ' ' + userInfo.lastName,
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            userName: userInfo.userName,
            emailId: userInfo.emailId,
            contactNumber: userInfo.contactNumber,
            dob: userInfo.dob.toDateString(),
            bio: userInfo.bio,
            createdOn: userInfo.createdOn.toDateString(),
            lastLogin: userInfo.lastLogin.toDateString(),
            custContactEmailId: process.env.EMAIL_USER
        }
    };

    sendMail(userInfo.emailId, mailOptions);
}

const passwordUpdatedSuccessfullMail = (emailId, fullName) => {
    const mailOptions = {
        from: 'Wallet watcher',
        to: emailId,
        subject: 'Password Updated Successfully',
        template: 'passwordUpdatedMail',
        context: {
            fullName: fullName,
            custContactEmailId: process.env.EMAIL_USER
        }
    };

    sendMail(emailId, mailOptions);
}

const accountDeactivatedMail = (payload) => {
    const mailOptions = {
        from: 'Wallet watcher',
        to: payload.emailId,
        subject: 'Account Deactivation Confirmation',
        template: 'accountDeactivatedMail',
        context: {
            fullName: payload.fullName,
            dateOfDeactivation: payload.dateOfDeactivation,
            reactivationTimeline: payload.reactivationTimeline,
            custContactEmailId: process.env.EMAIL_USER
        }
    };

    sendMail(payload.emailId, mailOptions);
}

const requestPasswordResetMail = (payload) => {
    const mailOptions = {
        from: 'Wallet watcher',
        to: payload.emailId,
        subject: 'Reset your Password',
        template: 'requestPasswordResetMail',
        context: {
            fullName: payload.fullName,
            verificationCode: FRONTEND_URL + '/reset-password/' + payload.custId + '/' + Date.now() + '/' + payload.verificationCode,
            custContactEmailId: process.env.EMAIL_USER
        }
    };

    sendMail(payload.emailId, mailOptions);
}

export {
    sendVerificationMail,
    sendVerificationSuccessfulMail,
    accountReactivatedMail,
    userDetailsUpdatedSuccessfullyMail,
    passwordUpdatedSuccessfullMail,
    accountDeactivatedMail,
    requestPasswordResetMail
}
'use strict';

import transporter from './emailConnection.js';

const sendVerificationSuccessfulMail = (userInfo) => {
    const mailOptions = {
        from: 'Wallet watcher',
        to: userInfo.emailId,
        subject: 'Account Verified - Welcome to Wallet watcher',
        template: 'verificationSuccessfulMail',
        context: {
            fullName: userInfo.firstName + " " + userInfo.lastName,
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            userName: userInfo.userName,
            contactNumber: userInfo.contactNumber,
            emailId: userInfo.emailId,
            custContactEmailId: process.env.EMAIL_USER
        }
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`Email has been sent to: ${userInfo.emailId}`);
        }
    });
}

export default sendVerificationSuccessfulMail;

'use strict';

import transporter from './emailConnection.js';
import { FRONTEND_URL } from '../constants.js';

// Verification mail service
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

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`Email has been sent to: ${emailId}`);
        }
    });
}

export default sendVerificationMail;

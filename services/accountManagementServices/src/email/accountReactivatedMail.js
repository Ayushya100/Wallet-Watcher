'use strict';

import transporter from './emailConnection.js';

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

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`Email has been sent to: ${emailId}`);
        }
    });
};

export default accountReactivatedMail;

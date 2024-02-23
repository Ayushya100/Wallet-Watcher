'use strict';

import transporter from './emailConnection.js';

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

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`Email has been sent to: ${userInfo.emailId}`);
        }
    });
}

export default userDetailsUpdatedSuccessfullyMail;

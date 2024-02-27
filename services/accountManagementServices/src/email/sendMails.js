'use strict';

import transporter from './emailConnection.js';

const sendMail = (emailId, mailOptions) => {
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`Email has been sent to: ${emailId}`);
        }
    });
}

export default sendMail;

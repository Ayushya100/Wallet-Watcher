'use strict';

import emailConnection from './emailConnection.js';
import sendVerificationMail from './sendVerificationMail.js';
import sendVerificationSuccessfulMail from './sendVerificationSuccessfulMail.js';
import accountReactivatedMail from './accountReactivatedMail.js';

export default {
    emailConnection,
    sendVerificationMail,
    sendVerificationSuccessfulMail,
    accountReactivatedMail
};

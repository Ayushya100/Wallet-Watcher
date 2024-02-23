'use strict';

import emailConnection from './emailConnection.js';
import {
  sendVerificationMail,
  sendVerificationSuccessfulMail,
  accountReactivatedMail,
  userDetailsUpdatedSuccessfullyMail,
  passwordUpdatedSuccessfullMail
} from './userMails.js';

export default {
  emailConnection,
  sendVerificationMail,
  sendVerificationSuccessfulMail,
  accountReactivatedMail,
  userDetailsUpdatedSuccessfullyMail,
  passwordUpdatedSuccessfullMail
};

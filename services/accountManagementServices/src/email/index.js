'use strict';

import emailConnection from './emailConnection.js';
import {
  sendVerificationMail,
  sendVerificationSuccessfulMail,
  accountReactivatedMail,
  userDetailsUpdatedSuccessfullyMail,
  passwordUpdatedSuccessfullMail,
  accountDeactivatedMail,
  requestPasswordResetMail
} from './userMails.js';
import { 
  sendCardRegistrationMail
} from './cardMails.js';

export default {
  emailConnection,
  sendVerificationMail,
  sendVerificationSuccessfulMail,
  accountReactivatedMail,
  userDetailsUpdatedSuccessfullyMail,
  passwordUpdatedSuccessfullMail,
  accountDeactivatedMail,
  requestPasswordResetMail,
  sendCardRegistrationMail
};

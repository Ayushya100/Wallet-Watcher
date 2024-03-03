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
  sendCardRegistrationMail,
  sendCardUpdatedMail,
  sendCardDeactivatedMail,
  sendCardReactivationMail,
  sendCardDeletionMail
} from './cardMails.js';
import { 
  sendAccountRegistrationMail,
  sendAccountUpdatedMail,
  sendAccountDeactivationMail,
  sendAccountReactivationMail,
  sendAccountDeletionMail
} from './accountMails.js';

export default {
  emailConnection,
  sendVerificationMail,
  sendVerificationSuccessfulMail,
  accountReactivatedMail,
  userDetailsUpdatedSuccessfullyMail,
  passwordUpdatedSuccessfullMail,
  accountDeactivatedMail,
  requestPasswordResetMail,
  sendCardRegistrationMail,
  sendCardUpdatedMail,
  sendCardDeactivatedMail,
  sendCardReactivationMail,
  sendCardDeletionMail,
  sendAccountRegistrationMail,
  sendAccountUpdatedMail,
  sendAccountDeactivationMail,
  sendAccountReactivationMail,
  sendAccountDeletionMail
};

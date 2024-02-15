'use strict';

import { validateNewAccountPayload } from './validatePayload.controller.js';
import { checkAccountByAccNumber, createAccount } from './createAccount.controller.js';

export default {
    validateNewAccountPayload,
    checkAccountByAccNumber,
    createAccount
};

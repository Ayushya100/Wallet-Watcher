'use strict';

import { validateNewAccountPayload } from './validatePayload.controller.js';
import { checkAccountByAccNumber, createAccount } from './createAccount.controller.js';
import { getAllAccountInfo, getAccountInfoById } from './getAccountInfo.controller.js';

export default {
    validateNewAccountPayload,
    checkAccountByAccNumber,
    createAccount,
    getAllAccountInfo,
    getAccountInfoById
};

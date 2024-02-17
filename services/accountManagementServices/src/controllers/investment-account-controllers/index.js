'use strict';

import { validateNewAccountPayload, validateUpdateAccountPayload } from './validatePayload.controller.js';
import { checkAccountByAccNumber, createAccount } from './createAccount.controller.js';
import { getAllAccountInfo, getAccountInfoById } from './getAccountInfo.controller.js';
import { updateAccountInfo } from './updateAccountInfo.controller.js';
import { isAccountByIdExist } from './shared.controller.js';
import { deactivateAccount } from './deactivateAccount.controller.js';
import { reactivateAccount } from './reactivateAccount.controller.js';
import { deleteAccount } from './deleteAccount.controller.js';
import { generateAccountNumber } from './generateAccountNumber.controller.js';

export default {
    validateNewAccountPayload,
    validateUpdateAccountPayload,
    checkAccountByAccNumber,
    createAccount,
    getAllAccountInfo,
    getAccountInfoById,
    updateAccountInfo,
    isAccountByIdExist,
    deactivateAccount,
    reactivateAccount,
    deleteAccount,
    generateAccountNumber
};

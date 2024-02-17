'use strict';

import createAccount from './createAccount.route.js';
import getAccountInfo from './getAccountInfo.route.js';
import updateAccountInfo from './updateAccountInfo.route.js';
import deactivateAccount from './deactivateAccount.route.js';

export default {
    createAccount,
    getAccountInfo,
    updateAccountInfo,
    deactivateAccount
};

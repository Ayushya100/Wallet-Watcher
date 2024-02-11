'use strict';

import { 
    validateRegisterUserPayload,
    validateUserVerificationPayload
} from './validatePayload.controller.js';
import { checkUserByUserNameOrEmail, createNewUser } from './createUser.controller.js';
import { checkUserById } from './shared.controller.js';
import { verifyUser } from './verifyUser.controller.js';

export default {
    validateRegisterUserPayload,
    validateUserVerificationPayload,
    checkUserByUserNameOrEmail,
    createNewUser,
    checkUserById,
    verifyUser
};

'use strict';

import {
  validateRegisterUserPayload,
  validateUserVerificationPayload,
  validateUserLoginPayload,
} from './validatePayload.controller.js';
import { checkUserByUserNameOrEmail, createNewUser } from './createUser.controller.js';
import { checkUserById } from './shared.controller.js';
import { verifyUser } from './verifyUser.controller.js';
import {
  isUserValid,
  isUserVerified,
  isUserActive,
  generateAccessAndRefreshTokens
} from './loginUser.controller.js';

export default {
  validateRegisterUserPayload,
  validateUserVerificationPayload,
  validateUserLoginPayload,
  checkUserByUserNameOrEmail,
  createNewUser,
  checkUserById,
  verifyUser,
  isUserValid,
  isUserVerified,
  isUserActive,
  generateAccessAndRefreshTokens,
};
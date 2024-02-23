'use strict';

import {
  validateRegisterUserPayload,
  validateUserVerificationPayload,
  validateUserLoginPayload,
  validateUserDetailsPayload
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
import { isTokenAvailableAndActive, refreshTokens } from './refreshAccessToken.controller.js';
import { logoutUser } from './logoutUser.controller.js';
import { updateUserDetails } from './updateUserDetails.controller.js';

export default {
  validateRegisterUserPayload,
  validateUserVerificationPayload,
  validateUserLoginPayload,
  validateUserDetailsPayload,
  checkUserByUserNameOrEmail,
  createNewUser,
  checkUserById,
  verifyUser,
  isUserValid,
  isUserVerified,
  isUserActive,
  generateAccessAndRefreshTokens,
  isTokenAvailableAndActive,
  refreshTokens,
  logoutUser,
  updateUserDetails
};

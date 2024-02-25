'use strict';

import {
  validateRegisterUserPayload,
  validateUserVerificationPayload,
  validateUserLoginPayload,
  validateUserDetailsPayload,
  validatePasswordUpdatePayload,
  validateDeactivateUserPayload,
  validateProfileImagePayload,
  validateResetRequestPayload
} from './validatePayload.controller.js';
import { checkUserByUserNameOrEmail, createNewUser } from './createUser.controller.js';
import { checkUserById, checkUserByEmailOrUserName } from './shared.controller.js';
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
import { updateUserPassword, requestReset } from './updateUserPassword.controller.js';
import { validateUserCredentials, deactivateUser } from './deactivateUser.controller.js';
import { updateProfileImage, deleteProfileImage } from './profileImage.controller.js';

export default {
  validateRegisterUserPayload,
  validateUserVerificationPayload,
  validateUserLoginPayload,
  validateUserDetailsPayload,
  validatePasswordUpdatePayload,
  validateDeactivateUserPayload,
  validateProfileImagePayload,
  validateResetRequestPayload,
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
  updateUserDetails,
  updateUserPassword,
  validateUserCredentials,
  deactivateUser,
  updateProfileImage,
  deleteProfileImage,
  checkUserByEmailOrUserName,
  requestReset
};

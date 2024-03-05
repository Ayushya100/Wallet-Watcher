'use strict';

import { validateCreateSettingPayload, validateAssignSettingPayload } from './validatePayload.controller.js';
import { isSettingAvailable, createSetting } from './createSetting.controller.js';
import { getAllSettings } from './getAllSettings.controller.js';
import { assignSettingToUser, isSettingByIdAvailable } from './assignSettingToUser.controller.js';

export default {
    validateCreateSettingPayload,
    validateAssignSettingPayload,
    isSettingAvailable,
    createSetting,
    getAllSettings,
    assignSettingToUser,
    isSettingByIdAvailable
};

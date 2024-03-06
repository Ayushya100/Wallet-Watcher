'use strict';

import { 
    validateCreateSettingPayload, 
    validateAssignSettingPayload, 
    validateUpdateSettingPayload
} from './validatePayload.controller.js';
import { isSettingAvailable, createSetting } from './createSetting.controller.js';
import { getAllSettings } from './getAllSettings.controller.js';
import { assignSettingToUser } from './assignSettingToUser.controller.js';
import { isSettingByIdAvailable } from './shared.controller.js';
import { updateSettings } from './updateSetting.controller.js';

export default {
    validateCreateSettingPayload,
    validateAssignSettingPayload,
    validateUpdateSettingPayload,
    isSettingAvailable,
    createSetting,
    getAllSettings,
    assignSettingToUser,
    isSettingByIdAvailable,
    updateSettings
};

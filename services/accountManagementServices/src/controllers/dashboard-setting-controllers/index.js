'use strict';

import { validateCreateSettingPayload } from './validatePayload.controller.js';
import { isSettingAvailable, createSetting } from './createSetting.controller.js';
import { getAllSettings } from './getAllSettings.controller.js';

export default {
    validateCreateSettingPayload,
    isSettingAvailable,
    createSetting,
    getAllSettings
};

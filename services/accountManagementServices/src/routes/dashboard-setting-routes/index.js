'use strict';

import createSetting from './createSettting.route.js';
import getSettingInfo from './getSettingInfo.route.js';
import assignSettingsToUser from './assignSettingToUser.route.js';
import updateSetting from './updateSetting.route.js';
import deassignSetting from './deassignSettingFromUser.route.js';

export default {
    createSetting,
    getSettingInfo,
    assignSettingsToUser,
    updateSetting,
    deassignSetting
};

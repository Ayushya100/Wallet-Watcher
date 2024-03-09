'use strict';

import {
    validateNewCategoryPayload,
    validateUserExistsPayload,
    validateUserInfoPayload
} from './validatePayload.controller.js';
import { isCategoryByNameExists, registerNewCategory } from './registerNewCategory.controller.js';
import {
    getAllCategoryInfo,
    getCategoryInfoById,
    getCategoryByType
} from './getCategoryInfo.controller.js';

export default {
    validateNewCategoryPayload,
    validateUserExistsPayload,
    validateUserInfoPayload,
    isCategoryByNameExists,
    registerNewCategory,
    getAllCategoryInfo,
    getCategoryInfoById,
    getCategoryByType
};

'use strict';

import { validateNewCategoryPayload, validateUserExistsPayload } from './validatePayload.controller.js';
import { isCategoryByNameExists, registerNewCategory } from './registerNewCategory.controller.js';
import { getAllCategoryInfo, getCategoryInfoById } from './getCategoryInfo.controller.js';

export default {
    validateNewCategoryPayload,
    validateUserExistsPayload,
    isCategoryByNameExists,
    registerNewCategory,
    getAllCategoryInfo,
    getCategoryInfoById
};

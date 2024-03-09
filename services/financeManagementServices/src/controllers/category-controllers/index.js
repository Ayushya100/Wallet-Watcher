'use strict';

import {
    validateNewCategoryPayload,
    validateUserExistsPayload,
    validateUserInfoPayload,
    validateUpdateCategoryPayload
} from './validatePayload.controller.js';
import { isCategoryByNameExists, registerNewCategory } from './registerNewCategory.controller.js';
import {
    getAllCategoryInfo,
    getCategoryInfoById,
    getCategoryByType
} from './getCategoryInfo.controller.js';
import { isCategoryInfoByIdExists } from './shared.controller.js';
import { updateCategoryName } from './updateCategoryInfo.controller.js';
import { deleteCategory } from './deleteCategory.controller.js';

export default {
    validateNewCategoryPayload,
    validateUserExistsPayload,
    validateUserInfoPayload,
    validateUpdateCategoryPayload,
    isCategoryByNameExists,
    registerNewCategory,
    getAllCategoryInfo,
    getCategoryInfoById,
    getCategoryByType,
    isCategoryInfoByIdExists,
    updateCategoryName,
    deleteCategory
};

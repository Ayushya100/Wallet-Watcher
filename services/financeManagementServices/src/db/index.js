'use strict';

import { 
    isCategoryByNameAvailable,
    createNewCategory,
    getAllCategoryInfo,
    getCategoryInfoById,
    getCategoryInfoByType,
    isCategoryByIdAvailable,
    updateCategoryName,
    deleteCategoryById
} from './finance.db.js';

export default {
    isCategoryByNameAvailable,
    createNewCategory,
    getAllCategoryInfo,
    getCategoryInfoById,
    getCategoryInfoByType,
    isCategoryByIdAvailable,
    updateCategoryName,
    deleteCategoryById
};

'use strict';

import { isUserByIdAvailable } from './user.db.js';
import { 
    isCategoryByNameAvailable,
    createNewCategory,
    getAllCategoryInfo,
    getCategoryInfoById,
    getCategoryInfoByType,
    isCategoryByIdAvailable,
    updateCategoryName,
    deleteCategoryById,
    isCardByTokenAvailable,
    registerNewIncomeRecord,
    updateCardAmount,
    getUserFinanceDetails,
    updateUserFinanceDetails
} from './finance.db.js';

export default {
    isCategoryByNameAvailable,
    createNewCategory,
    getAllCategoryInfo,
    getCategoryInfoById,
    getCategoryInfoByType,
    isCategoryByIdAvailable,
    updateCategoryName,
    deleteCategoryById,
    isUserByIdAvailable,
    isCardByTokenAvailable,
    registerNewIncomeRecord,
    updateCardAmount,
    getUserFinanceDetails,
    updateUserFinanceDetails
};

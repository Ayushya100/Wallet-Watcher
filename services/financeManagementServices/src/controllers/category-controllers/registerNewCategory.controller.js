'use strict';

import dbConnect from '../../db/index.js'

const convertCategoryName = (categoryName) => {
    return categoryName[0].toUpperCase() + categoryName.slice(1);
}

const isCategoryByNameExists = async(payload) => {
    try {
        payload.categoryName = convertCategoryName(payload.categoryName);
        const categoryDetails = await dbConnect.isCategoryByNameAvailable(payload);

        if (!categoryDetails) {
            return {
                resType: 'SUCCESS',
                resMsg: 'VALIDATION SUCCESSFULL - Category does not exists!',
                isValid: true
            };
        }
        return {
            resType: 'CONFLICT',
            resMsg: 'Category already exists',
            isValid: false
        };
    } catch (err) {
        return {
            resType: 'INTERNAL_SERVER_ERROR',
            resMsg: 'Some error occurred while working with db.',
            stack: err.stack,
            isValid: false
        };
    }
}

const registerNewCategory = async(payload) => {
    try {
        payload.categoryName = convertCategoryName(payload.categoryName);
        const newCategory = await dbConnect.createNewCategory(payload);

        if (newCategory) {
            return {
                resType: 'REQUEST_COMPLETED',
                resMsg: 'New category has been added successfully.',
                data: newCategory,
                isValid: true
            };
        }
        return {
            resType: 'INTERNAL_SERVER_ERROR',
            resMsg: 'Category registration failed!',
            isValid: false
        };
    } catch (err) {
        return {
            resType: 'INTERNAL_SERVER_ERROR',
            resMsg: 'Some error occurred while working with db.',
            stack: err.stack,
            isValid: false
        };
    }
}

export {
    isCategoryByNameExists,
    registerNewCategory
};

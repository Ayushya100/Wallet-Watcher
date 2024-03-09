'use strict';

import dbConnect from '../../db/index.js';

const getAllCategoryInfo = async(userId) => {
    try {
        const allCategoryInfo = await dbConnect.getAllCategoryInfo(userId);

        if (allCategoryInfo.length === 0) {
            return {
                resType: 'CONTENT_NOT_AVAILABLE',
                resMsg: 'No category found',
                data: allCategoryInfo,
                isValid: true
            };
        }
        return {
            resType: 'SUCCESS',
            resMsg: 'Category details found.',
            data: allCategoryInfo,
            isValid: true
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

const getCategoryInfoById = async(userId, categoryId) => {
    try {
        const categoryInfo = await dbConnect.getCategoryInfoById(userId, categoryId);

        if (categoryInfo.length === 0) {
            return {
                resType: 'BAD_REQUEST',
                resMsg: 'No category found',
                isValid: false
            };
        }
        return {
            resType: 'SUCCESS',
            resMsg: 'Category details found.',
            data: categoryInfo,
            isValid: true
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

const getCategoryByType = async(userId, categoryType) => {
    try {
        categoryType = categoryType.toUpperCase();
        const categoryInfo = await dbConnect.getCategoryInfoByType(userId, categoryType);

        if (categoryInfo.length === 0) {
            return {
                resType: 'CONTENT_NOT_AVAILABLE',
                resMsg: 'No category found',
                data: categoryInfo,
                isValid: true
            };
        }
        return {
            resType: 'SUCCESS',
            resMsg: 'Category details found.',
            data: categoryInfo,
            isValid: true
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
    getAllCategoryInfo,
    getCategoryInfoById,
    getCategoryByType
};

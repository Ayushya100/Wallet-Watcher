'use strict';

import dbConnect from '../../db/index.js';

const deleteCategory = async(userId, categoryId) => {
    try {
        const updatedCategoryInfo = await dbConnect.deleteCategoryById(userId, categoryId);

        if (!updatedCategoryInfo) {
            return {
                resType: 'BAD_REQUEST',
                resMsg: 'Category Deletion Failed!',
                isValid: false
            };
        }
        return {
            resType: 'REQUEST_COMPLETED',
            resMsg: 'Category info has been updated successfully.',
            data: updatedCategoryInfo,
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
    deleteCategory
};

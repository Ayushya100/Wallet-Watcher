'use strict';

import dbConnect from '../../db/index.js';

const updateCategoryName = async(categoryId, payload) => {
    try {
        payload.categoryName = payload.categoryName[0].toUpperCase() + payload.categoryName.slice(1);
        const updatedCategoryInfo = await dbConnect.updateCategoryName(categoryId, payload);

        if (updatedCategoryInfo.length === 0) {
            return {
                resType: 'CONTENT_NOT_AVAILABLE',
                resMsg: 'No category found',
                data: updatedCategoryInfo,
                isValid: true
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
    updateCategoryName
};

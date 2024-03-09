'use strict';

import dbConnect from '../../db/index.js';

const isCategoryInfoByIdExists = async(userId, categoryId) => {
    try {
        const categoryInfo = await dbConnect.isCategoryByIdAvailable(userId, categoryId);

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

export {
    isCategoryInfoByIdExists
};

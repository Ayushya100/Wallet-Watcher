'use strict';

import dbConnect from '../../db/index.js';

const isUserByIdAvailable = async(userId) => {
    try {
        const userDetail = await dbConnect.isUserByIdAvailable(userId);

        if (!userDetail) {
            return {
                resType: 'NOT_FOUND',
                resMsg: 'User Not Found',
                isValid: false
            };
        }

        return {
            resType: 'REQUEST_COMPLETED',
            resMsg: 'VALIDATION SUCCESSFULL.',
            data: userDetail,
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

const isCategoryByIdAvailable = async(userId, categoryId, type) => {
    try {
        const categoryDetail = await dbConnect.isCategoryByIdAvailable(userId, categoryId);
        
        if (!categoryDetail) {
            return {
                resType: 'NOT_FOUND',
                resMsg: 'Category Not Found',
                isValid: false
            };
        }

        if (categoryDetail.categoryType !== type) {
            return {
                resType: 'BAD_REQUEST',
                resMsg: 'Category-type mismatch',
                isValid: false
            };
        }

        return {
            resType: 'REQUEST_COMPLETED',
            resMsg: 'VALIDATION SUCCESSFULL.',
            data: categoryDetail,
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

const isCardByTokenAvailable = async(userId, cardToken) => {
    try {
        const cardDetails = await dbConnect.isCardByTokenAvailable(userId, cardToken);
        
        if (!cardDetails) {
            return {
                resType: 'NOT_FOUND',
                resMsg: 'Card Not Found',
                isValid: false
            };
        }

        if (!cardDetails.isActive) {
            return {
                resType: 'BAD_REQUEST',
                resMsg: 'Inactive Card! Cannot full-fill the request.',
                isValid: false
            };
        }

        return {
            resType: 'REQUEST_COMPLETED',
            resMsg: 'VALIDATION SUCCESSFULL.',
            data: cardDetails,
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
    isUserByIdAvailable,
    isCategoryByIdAvailable,
    isCardByTokenAvailable
};

'use strict';

const isValidCategoryType = (categoryType) => {
    return ['EXPENSE', 'CREDIT-EXPENSE', 'INVESTMENT', 'INCOME'].includes(categoryType.toUpperCase());
}

const validateNewCategoryPayload = (payload) => {
    let response = {
        resType: 'SUCCESS',
        resMsg: 'VALIDATION SUCCESSFULL',
        isValid: true
    };

    if (!payload.userId) {
        response.resType = 'BAD_REQUEST';
        response.resMsg = 'User Id is missing';
        response.isValid = false;
    }

    if (!payload.categoryType) {
        response.resType = 'BAD_REQUEST';
        response.resMsg = 'Category Type is missing';
        response.isValid = false;
    }

    if (!payload.categoryName) {
        response.resType = 'BAD_REQUEST';
        response.resMsg = 'Category Name is missing';
        response.isValid = false;
    }

    if (!isValidCategoryType(payload.categoryType)) {
        response.resType = 'BAD_REQUEST';
        response.resMsg = 'Category Type is invalid';
        response.isValid = false;
    }

    return response;
}

export {
    validateNewCategoryPayload
};

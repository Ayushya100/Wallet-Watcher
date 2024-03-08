'use strict';

const validateCreateSettingPayload = (payload) => {
    let response = {
        resType: 'SUCCESS',
        resMsg: 'VALIDATION SUCCESSFULL',
        isValid: true
    };

    if (!payload.categoryName || !payload.categoryDescription || !payload.categoryType || payload.isPeriodic === '') {
        response.resType = 'BAD_REQUEST';
        response.resMsg = `Required parameters cannot be empty`;
        response.isValid = false;
    }

    if (payload.isPeriodic && !payload.duration) {
        response.resType = 'BAD_REQUEST';
        response.resMsg = `Required parameters cannot be empty`;
        response.isValid = false;
    }

    return response;
}

const validateAssignSettingPayload = (payload) => {
    let response = {
        resType: 'SUCCESS',
        resMsg: 'VALIDATION SUCCESSFULL',
        isValid: true
    };
    
    if (!payload.value) {
        response.resType = 'BAD_REQUEST';
        response.resMsg = 'Default Value is required';
        response.isValid = false;
    }
    return response;
}

const validateUpdateSettingPayload = (payload) => {
    let response = {
        resType: 'SUCCESS',
        resMsg: 'VALIDATION SUCCESSFULL',
        isValid: true
    };

    if (!payload.userId) {
        response.resType = 'BAD_REQUEST';
        response.resMsg = 'User Id is required';
        response.isValid = false;
    }
    return response;
}

export {
    validateCreateSettingPayload,
    validateAssignSettingPayload,
    validateUpdateSettingPayload
};

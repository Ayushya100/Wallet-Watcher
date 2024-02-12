'use strict';

import validators from '../../assets/validators/payloadValidators.js';

const validUserName = (userName) => {
    return validators.userName.test(userName);
}

const validEmailId = (emailId) => {
    return validators.email.test(emailId);
}

const validPassword = (password) => {
    return validators.password.test(password);
}

// Mandatory parameters check for registering new user
const validateRegisterUserPayload = (payload) => {
    let response = {
        resType: 'SUCCESS',
        resMsg: 'VALIDATION SUCCESSFULL',
        isValid: true,
        data: payload
    };

    const mandatoryFilds = ['firstName', 'userName', 'emailId', 'password'];

    if (!payload.firstName || !payload.userName || !payload.emailId || !payload.password) {
        response.resType = 'BAD_REQUEST';
        response.resMsg = 'Required Parameter is missing';
        response.isValid = false;

        for (const field of mandatoryFilds) {
            if (!payload[field]) {
                response.resMsg += `: ${field}`;
                break;
            }
        }
    }

    if (!validUserName(payload.userName)) {
        response.resType = 'BAD_REQUEST';
        response.resMsg = 'Pattern invalid. Username incorrect';
        response.isValid = false;
    }
    
    if (!validEmailId(payload.emailId)) {
        response.resType = 'BAD_REQUEST';
        response.resMsg = 'Pattern invalid. EmailID incorrect';
        response.isValid = false;
    }

    if (!validPassword(payload.password)) {
        response.resType = 'BAD_REQUEST';
        response.resMsg = 'Pattern invalid. Password incorrect';
        response.isValid = false;
    }

    return response;
}

// Mandatory parameters check for verifying new user
const validateUserVerificationPayload = (time, verificationCode) => {
    let response = {
        resType: 'SUCCESS',
        resMsg: 'VALIDATION SUCCESSFULL',
        isValid: true
    };

    if (!time || !verificationCode) {
        response.resType = 'BAD_REQUEST';
        response.resMsg = 'Required parameter is missing';
        response.isValid = false;
    }

    return response;
}

// Mandatory parameters check for registering new user
const validateUserLoginPayload = (payload) => {
    let response = {
        resType: 'SUCCESS',
        resMsg: 'VALIDATION SUCCESSFULL',
        isValid: true
    };

    if (!payload.userNameOrEmail || !payload.password) {
        response.resType = 'BAD_REQUEST';
        response.resMsg = 'Required parameter is missing';
        response.isValid = false;
    }

    return response;
}

export {
    validateRegisterUserPayload,
    validateUserVerificationPayload,
    validateUserLoginPayload
};
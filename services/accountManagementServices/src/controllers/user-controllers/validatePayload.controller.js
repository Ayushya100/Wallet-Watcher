'use strict';

// Mandatory parameters check for registering new user
const validateRegisterUserPayload = (payload) => {
    let response = {
        resType: 'SUCCESS',
        resMsg: 'VALIDATION SUCCESSFULL',
        isValid: true,
        data: payload
    }

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

    return response;
}

export {
    validateRegisterUserPayload
};

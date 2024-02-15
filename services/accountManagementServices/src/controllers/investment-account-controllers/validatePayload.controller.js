'use strict';

import validators from '../../assets/validators/payloadValidators.js';

const validateAccountNumber = (accountNumber) => {
    return validators.accountNumber.test(accountNumber);
}

// Mandatory parameters check for new account
const validateNewAccountPayload = (payload) => {
    let response = {
        resType: 'SUCCESS',
        resMsg: 'VALIDATION SUCCESSFULL',
        isValid: true
    };

    const mandatoryFilds = ['accountName', 'accountNumber', 'accountDate', 'holderName'];

    if (!payload.accountName || !payload.accountNumber || !payload.accountDate || !payload.holderName) {
        response.resType = 'BAD_REQUEST';
        response.resMsg = 'Required parameter is missing';
        response.isValid = false;

        for (const field of mandatoryFilds) {
            if (!payload[field]) {
                response.resMsg += ` - ${field}`;
                break;
            }
        }
    }

    if (!validateAccountNumber(payload.accountNumber)) {
        response.resType = 'BAD_REQUEST';
        response.resMsg = 'Pattern Invalid. Account number incorrect';
        response.isValid = false;
    }

    return response;
}

export {
    validateNewAccountPayload
};

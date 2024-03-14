'use strict';

const validateProvidedDate = (enteredDate) => {
    enteredDate = new Date(enteredDate);
    const currentDate = new Date();
    return enteredDate <= currentDate;
}

const verifyRegisterIncomePayload = (payload) => {
    let response = {
        resType: 'SUCCESS',
        resMsg: 'VALIDATION SUCCESSFULL',
        isValid: true
    };

    const mandatoryFilds = ['userId', 'incomeCategoryId', 'cardToken', 'amount', 'dateOfCredit'];

    if (!payload.userId || !payload.incomeCategoryId || !payload.cardToken || !payload.amount || !payload.dateOfCredit) {
        response.resType = 'BAD_REQUEST';
        response.resMsg = 'Required parameter is missing';
        response.isValid = false;

        for (const field of mandatoryFilds) {
            if (!payload[field]) {
                response.resMsg += `: ${field}`;
                break;
            }
        }
    }

    if (!validateProvidedDate(payload.dateOfCredit)) {
        response.resType = 'BAD_REQUEST';
        response.resMsg = 'Credit date cannot be future date!';
        response.isValid = false;
    }

    return response;
}

export {
    verifyRegisterIncomePayload
};

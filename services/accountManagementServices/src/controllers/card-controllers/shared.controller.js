'use strict';

import dbConnect from '../../db/index.js';

const isCardByIdExist = async(userId, cardId) => {
    try {
        const isCardAvailable = await dbConnect.getCardInfoByToken(userId, cardId);

        if (isCardAvailable) {
            return {
                resType: 'SUCCESS',
                resMsg: 'VALIDATION SUCCESSFULL',
                data: isCardAvailable,
                isValid: true
            };
        }
        return {
            resType: 'NOT_FOUND',
            resMsg: 'No Card Found',
            isValid: false
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
    isCardByIdExist
};

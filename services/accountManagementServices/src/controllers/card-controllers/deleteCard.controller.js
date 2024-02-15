'use strict';

import dbConnect from '../../db/index.js';

const deleteCard = async(userId, cardId) => {
    try {
        const updatedCardInfo = await dbConnect.deleteCard(userId, cardId);

        return {
            resType: 'REQUEST_COMPLETED',
            resMsg: 'Card Deleted Successfully',
            data: updatedCardInfo,
            isValid: true
        };
    } catch(err) {
        return {
            resType: 'INTERNAL_SERVER_ERROR',
            resMsg: 'Some error occurred while working with db.',
            stack: err.stack,
            isValid: false
        };
    }
}

export {
    deleteCard
};

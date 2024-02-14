'use strict';

import dbConnect from '../../db/index.js';

const updateCardinfo = async(userId, cardId, payload) => {
    try {
        const updatedCardInfo = await dbConnect.updateExistingCard(userId, cardId, payload);
        return {
            resType: 'REQUEST_COMPLETED',
            resMsg: 'Card Info Updated',
            data: updatedCardInfo,
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
    updateCardinfo
};

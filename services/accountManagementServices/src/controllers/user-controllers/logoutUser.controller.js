'use strict';

import dbConnect from '../../db/index.js';

const logoutUser = async(userId) => {
    try {
        await dbConnect.logoutUser(userId);
        return {
            resType: 'SUCCESS',
            resMsg: 'User LoggedOut Successfully',
            data: true,
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
    logoutUser
};

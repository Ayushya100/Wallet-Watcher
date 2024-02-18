'use strict';

import jwt from 'jsonwebtoken';
import dbConnect from '../../db/index.js';

const isTokenAvailableAndActive = (refreshToken) => {
    try {
        if (!refreshToken) {
            return next({
                resType: 'BAD_REQUEST',
                resMsg: 'TOKEN NOT FOUND',
                isValid: false
            });
        }

        const decodedRefreshToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);
        
        return {
            resType: 'SUCCESS',
            resMsg: 'TOKEN VERIFIED',
            data: decodedRefreshToken,
            isValid: true
        };
    } catch(err) {
        return {
            resType: 'UNAUTHORIZED',
            resMsg: 'UNAUTHORIZED ACCESS - TOKEN EXPIRED / NOT FOUND',
            isValid: false
        };
    }
}

const refreshTokens = async(userId) => {
    try {
        const refreshedTokens = await dbConnect.generateAccessAndRefreshTokens(userId);
        return {
            resType: 'REQUEST_COMPLETED',
            resMsg: 'TOKENS HAS BEEN REFRESHED SUCCESSFULLY',
            data: refreshedTokens,
            isValid: true
        };
    } catch (err) {
        return {
            resType: 'INTERNAL_SERVER_ERROR',
            resMsg: 'Some error occurred while working with db.',
            isValid: false
        };
    }
}

export {
    isTokenAvailableAndActive,
    refreshTokens
};

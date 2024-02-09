'use strict';

import jwt from 'jsonwebtoken';

const verifyToken = (tokenKey) => (req, res, next) => {
    try {
        const accessToken = req.cookies?.accessToken || req.header('Authorization')?.replace('Bearer ', '');
        
        if (!accessToken) {
            return next({
                resType: 'BAD_REQUEST',
                resMsg: 'TOKEN NOT FOUND',
                isValid: false
            });
        }

        const decodedToken = jwt.verify(accessToken, tokenKey);
        res.user = {
            userId: decodedToken._id
        };
        next();
    } catch(err) {
        next({
            resType: 'UNAUTHORIZED',
            resMsg: 'UNAUTHORIZED ACCESS - TOKEN EXPIRED',
            stack: err.stack,
            isValid: false
        });
    }
};

export default verifyToken;

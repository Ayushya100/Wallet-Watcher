'use strict';

import dbConnect from '../../db/index.js';
import emailServices from '../../email/index.js';

const verifyUser = async(payload) => {
    const currentTime = Date.now();
    const verificationTime = Math.ceil((currentTime - payload.requestTime) / (6 * 60 * 60 * 1000));

    const userInfo = await dbConnect.isUserByIdAvailable(payload.userId);

    if ((verificationTime <= 1) && (userInfo.verificationCode === payload.verificationCode)) {
        const verifiedUser = await dbConnect.validateUser(payload.userId);

        emailServices.sendVerificationSuccessfulMail(verifiedUser);
        return {
            resType: 'REQUEST_COMPLETED',
            resMsg: 'USER VERIFICATION SUCCESSFUL',
            data: verifiedUser,
            isValid: true
        };
    }

    return {
        resType: 'BAD_REQUEST',
        resMsg: 'USER VERIFICATION FAILED',
        isValid: false
    };
}

export {
    verifyUser
};

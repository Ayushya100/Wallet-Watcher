'use strict';

import { ApiResponse, responseCodes, responseMessage } from 'lib-service-comms';
import accountServices from '../../controllers/investment-account-controllers/index.js';

// API Function
const getAccountInfo = async(req, res, next) => {
    try {
        const userId = req.params.userId;
        const accountToken = req.params.accountToken;

        if (accountToken) {
            const getOneAccountInfo = await accountServices.getAccountInfoByToken(userId, accountToken);

            if (getOneAccountInfo.isValid) {
                res.status(responseCodes[getOneAccountInfo.resType]).json(
                    new ApiResponse(
                        responseCodes[getOneAccountInfo.resType],
                        getOneAccountInfo.data,
                        getOneAccountInfo.resMsg + ' - ' + responseMessage[getOneAccountInfo.resType]
                    )
                );
            } else {
                return next(getOneAccountInfo);
            }
        } else {
            const getAllAccountInfo = await accountServices.getAllAccountInfo(userId);

            if (getAllAccountInfo) {
                res.status(responseCodes[getAllAccountInfo.resType]).json(
                    new ApiResponse(
                        responseCodes[getAllAccountInfo.resType],
                        getAllAccountInfo.data,
                        getAllAccountInfo.resMsg + ' - ' + responseMessage[getAllAccountInfo.resType]
                    )
                );
            } else {
                return next(getAllAccountInfo);
            }
        }
    } catch (err) {
        next({
            resType: 'INTERNAL_SERVER_ERROR',
            resMsg: err,
            stack: err.stack,
            isValid: false
        });
    }
}

export default getAccountInfo;

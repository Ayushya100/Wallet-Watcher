'use strict';

import { ApiResponse, responseCodes, responseMessage } from 'lib-service-comms';
import categoryServices from '../../controllers/category-controllers/index.js';

// API Function
const getCategoryByType = async(req, res, next) => {
    try {
        const categoryType = req.params.categoryType;
        const userId = req.body.userId;

        // Validate Payload
        const isValidPayload = categoryServices.validateUserInfoPayload(userId, categoryType);

        if (isValidPayload.isValid) {
            // Get Category Info
            const categoryInfo = await categoryServices.getCategoryByType(userId, categoryType);

            if (categoryInfo.isValid) {
                res.status(responseCodes[categoryInfo.resType]).json(
                    new ApiResponse(
                        responseCodes[categoryInfo.resType],
                        categoryInfo.data,
                        categoryInfo.resMsg + ' - ' + responseMessage[categoryInfo.resType]
                    )
                );
            } else {
                return next(categoryInfo);
            }
        } else {
            return next(isValidPayload);
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

export default getCategoryByType;

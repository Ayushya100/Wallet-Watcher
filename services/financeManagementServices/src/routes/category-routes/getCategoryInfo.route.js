'use strict';

import { ApiResponse, responseCodes, responseMessage } from 'lib-service-comms';
import categoryServices from '../../controllers/category-controllers/index.js';

// API Function
const getCategoryInfo = async(req, res, next) => {
    try {
        const categoryId = req.params.id;
        const userId = req.body.userId;

        // Validate if userId available
        const isValidPayload = categoryServices.validateUserExistsPayload(userId);

        if (isValidPayload.isValid) {
            if (categoryId) {
                const categoryInfo = await categoryServices.getCategoryInfoById(userId, categoryId);
    
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
                const allCategoryInfo = await categoryServices.getAllCategoryInfo(userId);
    
                if (allCategoryInfo.isValid) {
                    res.status(responseCodes[allCategoryInfo.resType]).json(
                        new ApiResponse(
                            responseCodes[allCategoryInfo.resType],
                            allCategoryInfo.data,
                            allCategoryInfo.resMsg + ' - ' + responseMessage[allCategoryInfo.resType]
                        )
                    );
                } else {
                    return next(allCategoryInfo);
                }
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

export default getCategoryInfo;

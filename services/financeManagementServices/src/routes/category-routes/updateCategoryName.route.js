'use strict';

import { ApiResponse, responseCodes, responseMessage } from 'lib-service-comms';
import categoryServices from '../../controllers/category-controllers/index.js';

// API Function
const updateCategoryName = async(req, res, next) => {
    try {
        const categoryId = req.params.id;
        const payload = req.body;

        // Validate Payload
        const isValidPayload = categoryServices.validateUpdateCategoryPayload(payload);

        if (isValidPayload.isValid) {
            // Is Category Exists
            const isCategoryAvailable = await categoryServices.isCategoryInfoByIdExists(payload.userId, categoryId);

            if (isCategoryAvailable.isValid) {
                // Update Category Info
                const updatedInfo = await categoryServices.updateCategoryName(categoryId, payload);
    
                if (updatedInfo.isValid) {
                    res.status(responseCodes[updatedInfo.resType]).json(
                        new ApiResponse(
                            responseCodes[updatedInfo.resType],
                            updatedInfo.data,
                            updatedInfo.resMsg + ' - ' + responseMessage[updatedInfo.resType]
                        )
                    );
                } else {
                    return next(updatedInfo);
                }
            } else {
                return next(isCategoryAvailable);
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

export default updateCategoryName;

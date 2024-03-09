'use strict';

import { ApiResponse, responseCodes, responseMessage } from 'lib-service-comms';
import categoryServices from '../../controllers/category-controllers/index.js';

// API Function
const deleteCategory = async(req, res, next) => {
    try {
        const categoryId = req.params.id;
        const userId = req.body.userId;

        // Validate Payload
        const isValidPayload = categoryServices.validateUserExistsPayload(userId);

        if (isValidPayload.isValid) {
            // Is Category Exists
            const isUserAvailable = await categoryServices.isCategoryInfoByIdExists(userId, categoryId);

            if (isUserAvailable.isValid) {
                // delete category
                const updatedInfo = await categoryServices.deleteCategory(userId, categoryId);

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
                return next(isUserAvailable);
            }
        } else {
            return next(isValidPayload);
        }
    } catch (err) {
        return {
            resType: 'INTERNAL_SERVER_ERROR',
            resMsg: err,
            stack: err.stack,
            isValid: false
        };
    }
}

export default deleteCategory;

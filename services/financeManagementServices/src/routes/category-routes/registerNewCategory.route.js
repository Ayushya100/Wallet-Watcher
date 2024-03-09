'use strict';

import { ApiResponse, responseCodes, responseMessage } from 'lib-service-comms';
import categoryServices from '../../controllers/category-controllers/index.js';

// API Function
const registerNewCategory = async(req, res, next) => {
    try {
        const payload = req.body;

        // Validate Payload
        const isValidPayload = categoryServices.validateNewCategoryPayload(payload);

        if (isValidPayload.isValid) {
            // Check for already existing category
            const isCategoryFound = await categoryServices.isCategoryByNameExists(payload);
    
            if (isCategoryFound.isValid) {
                // Create new category
                const newCategoryDetails = await categoryServices.registerNewCategory(payload);

                if (newCategoryDetails.isValid) {
                    res.status(responseCodes[newCategoryDetails.resType]).json(
                        new ApiResponse(
                            responseCodes[newCategoryDetails.resType],
                            newCategoryDetails.data,
                            newCategoryDetails.resMsg + ' - ' + responseMessage[newCategoryDetails.resType]
                        )
                    );
                } else {
                    return next(newCategoryDetails);
                }
            } else {
                return next(isCategoryFound);
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

export default registerNewCategory;

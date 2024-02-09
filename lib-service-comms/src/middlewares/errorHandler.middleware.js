'use strict';

import ApiError from '../utils/ApiError.js';
import { responseCodes, responseMessage } from '../assets/response/response-codes.js';

const errorHandler = (err, req, res, next) => {
    res.status(responseCodes[err.resType]).json(
        new ApiError(responseCodes[err.resType], responseMessage[err.resType], err.resType, err.resMsg, err.stack, err.data)
    );
};

export default errorHandler;

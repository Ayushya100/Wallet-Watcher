'use strict';

class ApiError extends Error {
    constructor(
        statusCode,
        message = 'An error occurred while processing your request.',
        type = 'INTERNAL_SERVER_ERROR',
        errors = [],
        stack = '',
        data = null
    ) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.type = type;
        this.errors = errors;
        this.data = data;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
};

export default ApiError;

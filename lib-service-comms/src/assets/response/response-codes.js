'use strict';

const responseCodes = {
    PROCESSING: 102,
    SUCCESS: 200,
    REQUEST_COMPLETED: 201,
    REQUEST_ACCEPTED: 202,
    CONTENT_NOT_AVAILABLE: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    REQUEST_TIMEOUT: 408,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
    BAD_GATEWAY: 502,
    GETWAY_TIMEOUT: 504
};

const responseMessage = {
    PROCESSING: 'Request under processing state.',
    SUCCESS: 'The request was successful.',
    REQUEST_COMPLETED: 'Request completed.',
    REQUEST_ACCEPTED: 'Request accepted.',
    CONTENT_NOT_AVAILABLE: 'No content available.',
    BAD_REQUEST: 'Bad Request. The server could not understand the request due to invalid syntax or missing required parameters.',
    UNAUTHORIZED: 'Unauthorized access. Could not proceed with the request.',
    FORBIDDEN: 'Forbidden action. You do not have permission to perform this operation on the target resource.',
    NOT_FOUND: 'Not Found. Requested resource does not exist.',
    METHOD_NOT_ALLOWED: 'Method Not Allowed.',
    REQUEST_TIMEOUT: 'Request timeout.',
    CONFLICT: 'The request could not be completed due to the conflict with the current state.',
    INTERNAL_SERVER_ERROR: 'An Internal Server Error occurred while processing the request.',
    BAD_GATEWAY: 'Bad Gateway. The server could not complete the request.',
    GETWAY_TIMEOUT: 'Gateway Timeout.'
};

export { responseCodes, responseMessage };

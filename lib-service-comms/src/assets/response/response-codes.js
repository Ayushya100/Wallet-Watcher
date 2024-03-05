'use strict';

const responseCodes = {
    PROCESSING: 102,
    SUCCESS: 200,
    REQUEST_COMPLETED: 201,
    REQUEST_ACCEPTED: 202,
    CONTENT_NOT_AVAILABLE: 204,
    RESET_CONTENT: 205,
    PARTIAL_CONTENT: 206,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    REQUEST_TIMEOUT: 408,
    CONFLICT: 409,
    LENGTH_REQUIRED: 411,
    PRECONDITION_FAILED: 412,
    PAYLOAD_TOO_LARGE: 413,
    URI_TOO_LARGE: 414,
    UNSUPPORTED_MEDIA: 415,
    EXPECTATION_FAILED: 417,
    UNPROCESSABLE_CONTENT: 422,
    TOO_MANY_REQUESTS: 429,
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
    RESET_CONTENT: 'Reset the document which sent this request.',
    PARTIAL_CONTENT: 'Partial content available',
    BAD_REQUEST: 'Bad Request. The server could not understand the request due to invalid syntax or missing required parameters.',
    UNAUTHORIZED: 'Unauthorized access. Could not proceed with the request.',
    FORBIDDEN: 'Forbidden action. You do not have permission to perform this operation on the target resource.',
    NOT_FOUND: 'Not Found. Requested resource does not exist.',
    METHOD_NOT_ALLOWED: 'Method Not Allowed.',
    REQUEST_TIMEOUT: 'Request timeout.',
    CONFLICT: 'The request could not be completed due to the conflict with the current state.',
    LENGTH_REQUIRED: 'Server rejected the request because the content-length header field is not defined.',
    PRECONDITION_FAILED: 'The client has indicated preconditions in its headers which the server does not meet.',
    PAYLOAD_TOO_LARGE: 'Request entity is larger than limits defined.',
    URI_TOO_LARGE: 'The URI requested by the client is too large.',
    UNSUPPORTED_MEDIA: 'The media format of the requested data is not supported by the server.',
    EXPECTATION_FAILED: 'Expected request header field cannot be met by the server.',
    UNPROCESSABLE_CONTENT: 'The request was unabled to be followed due to semantic/internal errors.',
    TOO_MANY_REQUESTS: 'The user has sent too many requests in a given amount of time.',
    INTERNAL_SERVER_ERROR: 'An Internal Server Error occurred while processing the request.',
    BAD_GATEWAY: 'Bad Gateway. The server could not complete the request.',
    GETWAY_TIMEOUT: 'Gateway Timeout.'
};

export { responseCodes, responseMessage };

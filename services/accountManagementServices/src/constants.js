'use strict';

const DB_NAME = 'dFTCollection';
const USERS_API = '/api/v1.0/users';
const FRONTEND_URL = 'http://192.168.0.104:4200';

const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: true
};

export {
    DB_NAME,
    USERS_API,
    FRONTEND_URL,
    COOKIE_OPTIONS
};

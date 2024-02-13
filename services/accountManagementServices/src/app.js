'use strict';

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import { errorHandler, verifyToken } from 'lib-service-comms';

// User Routes
import { USERS_API } from './constants.js';
import userRoutes from './routes/user-routes/index.js';
import cardRoutes from './routes/card-routes/index.js';

const app = express();

// Setting up Middlewares
app.use(cors({
    origin: process.env.CORS_ORIGIN, // reflecting the request origin
    credentials: true
}));

app.use(express.json({
    limit: '1mb' // Maximum request body size.
}));

app.use(express.urlencoded({
    extended: true,
    limit: '32kb'
}));

app.use(rateLimit({
    windowMs: 10 * 60 * 1000, // 10 min max
    max: 50 // limit each IP to 50 requests per windowMs
}));

app.use(express.static('public'));

app.use(cookieParser());

const tokenKey = process.env.ACCESS_TOKEN_KEY;

// User Account Routes
app.post(`${USERS_API}/create-user`, userRoutes.createUser);
app.put(`${USERS_API}/:userId/verify-user`, userRoutes.verifyUser);
app.post(`${USERS_API}/user-login`, userRoutes.loginUser);
app.get(`${USERS_API}/get-user-info/:id`, verifyToken(tokenKey), userRoutes.getUserInfo);

// User Card Routes
app.post(`${USERS_API}/:userId/register-card`, verifyToken(tokenKey), cardRoutes.registerCard);
app.get(`${USERS_API}/:userId/get-card-info`, verifyToken(tokenKey), cardRoutes.getCardInfo);
app.get(`${USERS_API}/:userId/get-card-info/:id`, verifyToken(tokenKey), cardRoutes.getCardInfo);
app.put(`${USERS_API}/:userId/update-card-info/:id`, verifyToken(tokenKey), cardRoutes.updateCardInfo);

// Error Handler middleware
app.use(errorHandler);

export default app;

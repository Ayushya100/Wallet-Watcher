'use strict';

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import { errorHandler, verifyToken } from 'lib-service-comms';

// User Routes
import { USERS_API } from './constants.js';
import { checkCardExist, checkAccountExist } from './middlewares/index.js';
import userRoutes from './routes/user-routes/index.js';
import cardRoutes from './routes/card-routes/index.js';
import accountRoutes from './routes/investment-account-routes/index.js';
import dashboardRoutes from './routes/user-dashboard-routes/index.js';

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
app.put(`${USERS_API}/:userId/update-card-info/:id`, verifyToken(tokenKey), checkCardExist, cardRoutes.updateCardInfo);
app.put(`${USERS_API}/:userId/deactivate-card/:id`, verifyToken(tokenKey), checkCardExist, cardRoutes.deactivateCard);
app.put(`${USERS_API}/:userId/reactivate-card/:id`, verifyToken(tokenKey), checkCardExist, cardRoutes.reactivateCard);
app.delete(`${USERS_API}/:userId/delete-card/:id`, verifyToken(tokenKey), checkCardExist, cardRoutes.deleteCard);
app.get(`${USERS_API}/generate-card-number`, verifyToken(tokenKey), cardRoutes.generateCardNumber);

// Investment Account Routes
app.post(`${USERS_API}/:userId/create-account`, verifyToken(tokenKey), accountRoutes.createAccount);
app.get(`${USERS_API}/:userId/get-account-info`, verifyToken(tokenKey), accountRoutes.getAccountInfo);
app.get(`${USERS_API}/:userId/get-account-info/:id`, verifyToken(tokenKey), accountRoutes.getAccountInfo);
app.put(`${USERS_API}/:userId/update-account-info/:id`, verifyToken(tokenKey), checkAccountExist, accountRoutes.updateAccountInfo);
app.put(`${USERS_API}/:userId/deactivate-account/:id`, verifyToken(tokenKey), checkAccountExist, accountRoutes.deactivateAccount);
app.put(`${USERS_API}/:userId/reactivate-account/:id`, verifyToken(tokenKey), checkAccountExist, accountRoutes.reactivateAccount);
app.delete(`${USERS_API}/:userId/delete-account/:id`, verifyToken(tokenKey), checkAccountExist, accountRoutes.deleteAccount);
app.get(`${USERS_API}/generate-account-number`, verifyToken(tokenKey), accountRoutes.generateAccountNumber);

// User Dashboard Setting Routes
app.get(`${USERS_API}/:userId/get-dashboard-settings`, verifyToken(tokenKey), dashboardRoutes.getUserDashboardSetting);

// Error Handler middleware
app.use(errorHandler);

export default app;

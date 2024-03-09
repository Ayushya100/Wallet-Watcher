'use strict';

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import { errorHandler, verifyToken } from 'lib-service-comms';

// Finance Routes
import { FINANCE_API } from './constants.js';
import categoryRoutes from './routes/category-routes/index.js';

const app = express();

// Setting up Middlewares
app.use(cors({
    origin: process.env.CORS_ORIGIN, // reflecting the request origin
    credentials: true
}));

app.use(express.json({
    limit: '1mb' // Maximum request body size
}));

app.use(express.urlencoded({
    extended: true,
    limit: '32kb'
}));

app.use(rateLimit({
    windowMs: 10 * 60 * 1000, // 10 min max
    max: 50 // Limit each IP to 50 requests per window
}));

app.use(express.static('public'));

app.use(cookieParser());

const tokenKey = process.env.ACCESS_TOKEN_KEY;

// Category Routes
app.post(`${FINANCE_API}/register-category`, verifyToken(tokenKey), categoryRoutes.registerNewCategory);
app.get(`${FINANCE_API}/get-category-info`, verifyToken(tokenKey), categoryRoutes.getCategoryInfo);
app.get(`${FINANCE_API}/get-category-info/:id`, verifyToken(tokenKey), categoryRoutes.getCategoryInfo);
app.get(`${FINANCE_API}/get-category-by-type/:categoryType`, verifyToken(tokenKey), categoryRoutes.getCategoryByType);
app.put(`${FINANCE_API}/update-category/:id`, verifyToken(tokenKey), categoryRoutes.updateCategoryName);

// Error Handler middleware
app.use(errorHandler);

export default app;

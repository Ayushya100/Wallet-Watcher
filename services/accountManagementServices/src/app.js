'use strict';

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import { errorHandler } from 'lib-service-comms';

// User Routes
import { USERS_API } from './constants.js';
import userRoutes from './routes/user-routes/index.js';

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

// Routes
app.post(`${USERS_API}/create-user`, userRoutes.createUser);
app.put(`${USERS_API}/:userId/verify-user`, userRoutes.verifyUser);

// Error Handler middleware
app.use(errorHandler);

export default app;

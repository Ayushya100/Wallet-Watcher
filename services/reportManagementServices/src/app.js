'use strict';

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import { errorHandler } from 'lib-service-comms';

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
    windowMs: 15 * 60 * 1000, // 15 min max
    max: 50 // Limit each IP to 50 requests per window
}));

app.use(express.static('public'));

app.use(cookieParser());

// Error Handler middleware
app.use(errorHandler);

export default app;

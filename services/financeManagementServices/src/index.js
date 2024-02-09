'use strict';

import dbConnection from './db/dbConnection.js';
import app from './app.js';
import dotenv from 'dotenv';

dotenv.config({
    path: './env'
});

dbConnection()
.then(() => {
    const port = process.env.PORT || 4800;
    app.listen(port, () => {
        console.log(`Server is running on ${port}`);
    });
}).catch((err) => {
    console.log('DB Connection Failed! ', err);
});

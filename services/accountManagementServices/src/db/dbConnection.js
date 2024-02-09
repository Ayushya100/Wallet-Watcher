'use strict';

import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';

const dbConnection = async() => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        // console.log(connectionInstance);
        console.log(`Mongo DB connection establised. DB HOST: ${connectionInstance.connection.host}`);
    } catch (err) {
        console.log('Mongo DB Connection error: ', err);
        process.exit(1);
    }
};

export default dbConnection;

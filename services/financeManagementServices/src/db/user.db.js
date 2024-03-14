'use strict';

import mongoose from 'mongoose';

// Add DB Models
import { userModel } from 'lib-service-comms';

const User = userModel(mongoose);

const isUserByIdAvailable = async(userId) => {
    const isUserExist = await User.findById({
        _id: userId
    }).select(
        'firstName lastName userName emailId isVerified isDeleted'
    );
    return isUserExist;
}

export {
    isUserByIdAvailable
};

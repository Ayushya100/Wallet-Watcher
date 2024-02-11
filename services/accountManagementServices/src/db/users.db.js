'use strict';

import mongoose from 'mongoose';
import {v4 as uuidv4} from 'uuid';

// Add DB Models
import { userModel, UserFinanceModel, UserDashboardModel } from 'lib-service-comms';

const User = userModel(mongoose);
const UserFinance = UserFinanceModel(mongoose);
const UserDashboard = UserDashboardModel(mongoose);

const isUserByUserNameOrEmailAvailable = async(userName, emailId) => {
    const isUserExist = await User.findOne({
        $or: [{ userName }, { emailId }]
    });

    return isUserExist;
}

const isUserByIdAvailable = async(userId) => {
    const isUserExist = await User.findById({
        _id: userId
    }).select(
        '-password -isDeleted -createdBy -modifiedBy'
    );
    return isUserExist;
}

const generateVerificationCode = async(userId) => {
    const user = await User.findById({ _id: userId });
    const verificationCode = uuidv4() + user._id;
    const updatedUserInfo = await User.findByIdAndUpdate(
        { _id: user._id },
        {
            $set: {
                verificationCode: verificationCode,
                modifiedOn: Date.now(),
                modifiedBy: userId
            }
        },
        {
            new: true
        }
    ).select(
        '-password -loginCount -isDeleted -createdBy -modifiedBy'
    );
    return updatedUserInfo;
}

const createNewUser = async(payload) => {
    const newUser = await User.create({
        firstName: payload.firstName,
        lastName: payload.lastName,
        userName: payload.userName,
        emailId: payload.emailId,
        password: payload.password
    });

    await UserFinance.create({ userId: newUser._id });
    await UserDashboard.create({ userId: newUser._id });

    const updatedUser = await generateVerificationCode(newUser._id);
    return updatedUser;
}

const validateUser = async(userId) => {
    const updatedUserInfo = await User.findByIdAndUpdate(
        { _id: userId },
        {
            $set: {
                verificationCode: '',
                isVerified: true,
                modifiedOn: Date.now(),
                modifiedBy: userId
            }
        },
        {
            new: true
        }
    ).select(
        '-password -loginCount -isDeleted -createdBy -modifiedBy'
    );

    return updatedUserInfo;
}

export {
    isUserByUserNameOrEmailAvailable,
    isUserByIdAvailable,
    createNewUser,
    validateUser
};

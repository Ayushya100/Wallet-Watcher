'use strict';

import mongoose from 'mongoose';
import {v4 as uuidv4} from 'uuid';
import jwt from 'jsonwebtoken';

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

const verifyPassword = async(user, password) => {
    const isPasswordValid = await user.isPasswordCorrect(password);
    return isPasswordValid;
}

const reactivateUser = async(userId) => {
    const updatedUser = await User.findByIdAndUpdate(
        { _id: userId },
        {
            $set: {
                isDeleted: false,
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

    return updatedUser;
}

const generateAccessAndRefreshTokens = async(userId) => {
    const user = await User.findById({ _id: userId });

    const accessToken = jwt.sign(
        {
            _id: user._id,
            userName: user.userName,
            isVerified: user.isVerified,
            isDeleted: user.isDeleted
        },
        process.env.ACCESS_TOKEN_KEY,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );

    const refreshToken = jwt.sign(
        {
            _id: user._id
        },
        process.env.REFRESH_TOKEN_KEY,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    );

    const updatedUserInfo = await User.findByIdAndUpdate(
        { _id: user._id },
        {
            $set: {
                refreshToken: refreshToken,
                loginCount: user.loginCount + 1,
                lastLogin: Date.now(),
                modifiedOn: Date.now(),
                modifiedBy: userId
            }
        },
        {
            new: true
        }
    ).select(
        '-password -createdOn -createdBy -modifiedOn -modifiedBy'
    );

    return {
        accessToken,
        refreshToken,
        userId: updatedUserInfo._id,
        userName: updatedUserInfo.userName
    };
}

const logoutUser = async(userId) => {
    await User.findByIdAndUpdate(
        {
            _id: userId
        },
        {
            $set: {
                refreshToken: null,
                modifiedOn: Date.now(),
                modifiedBy: userId
            }
        },
        {
            new: true
        }
    );
    return true;
}

const getDashboardSettingById = async(userId) => {
    const userDashboardSettings = await UserDashboard.findOne(
        {
            userId: userId
        }
    ).select(
        '-createdOn -createdBy -modifiedOn -modifiedBy -isDeleted'
    );
    return userDashboardSettings;
}

const updateUserDashboardSetting = async(userId, dashboardId, payload) => {
    const updatedDashboardSettings = await UserDashboard.findByIdAndUpdate(
        {
            _id: dashboardId,
            userId: userId
        },
        {
            $set: payload
        },
        {
            new: true
        }
    ).select(
        '-createdOn -createdBy -modifiedOn -modifiedBy -isDeleted'
    );
    return updatedDashboardSettings;
}

export {
    isUserByUserNameOrEmailAvailable,
    isUserByIdAvailable,
    createNewUser,
    validateUser,
    verifyPassword,
    generateVerificationCode,
    reactivateUser,
    generateAccessAndRefreshTokens,
    logoutUser,
    getDashboardSettingById,
    updateUserDashboardSetting
};

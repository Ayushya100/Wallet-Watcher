'use strict';

import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from '../../constants.js';

const userModel = (mongoose) => {
    // Users Schema
    const userSchema = new mongoose.Schema(
        {
            firstName: {
                type: String,
                required: true,
                trim: true
            },
            lastName: {
                type: String,
                trim: true
            },
            userName: {
                type: String,
                required: true,
                trim: true,
                unique: true,
                index: true
            },
            emailId: {
                type: String,
                required: true,
                trim: true,
                unique: true,
                lowercase: true,
                index: true
            },
            bio: {
                type: String,
                required: false
            },
            gender: {
                type: String,
                required: false
            },
            dob: {
                type: Date,
                required: false
            },
            contactNumber: {
                type: Number,
                required: false,
                minlength: 10,
                maxlength: 10,
                trim: true
            },
            profileImageURL: {
                type: String,
                required: false
            },
            password: {
                type: String,
                required: true,
                trim: true
            },
            lastLogin: {
                type: Date,
                required: false
            },
            loginCount: {
                type: Number,
                default: 0,
                required: false
            },
            isVerified: {
                type: Boolean,
                default: false,
                required: true
            },
            isDeleted: {
                type: Boolean,
                default: false,
                required: true
            },
            verificationCode: {
                type: String,
                required: false
            },
            refreshToken: {
                type: String,
                required: false
            },
            createdOn: {
                type: Date,
                required: true,
                default: Date.now()
            },
            createdBy: {
                type: String,
                default: 'SYSTEM',
                required: false,
                trim: true
            },
            modifiedOn: {
                type: Date,
                required: true,
                default: Date.now()
            },
            modifiedBy: {
                type: String,
                default: 'SYSTEM',
                required: false,
                trim: true
            }
        }
    );

    userSchema.pre('save', async function(next) {
        if (!this.isModified('password')) return next();
        this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
        next();
    });

    userSchema.methods.isPasswordCorrect = async function(password) {
        return await bcrypt.compare(password, this.password);
    };

    // Users Model
    const Users = mongoose.model('User', userSchema);
    return Users;
}

export default userModel;

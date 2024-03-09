'use strict';

import mongoose from 'mongoose';

// Add DB Model
import { UserWalletCategoryModel } from 'lib-service-comms';

const UserWalletCategory = UserWalletCategoryModel(mongoose);

const isCategoryByNameAvailable = async(payload) => {
    const categoryDetails = await UserWalletCategory.findOne({
        userId: payload.userId,
        categoryType: payload.categoryType.toUpperCase(),
        categoryName: payload.categoryName,
        isDeleted: false
    }).select(
        'userId categoryType categoryName'
    );

    return categoryDetails;
}

const createNewCategory = async(payload) => {
    const categoryDetails = await UserWalletCategory.create({
        userId: payload.userId,
        categoryType: payload.categoryType.toUpperCase(),
        categoryName: payload.categoryName
    });

    return categoryDetails;
}

const getAllCategoryInfo = async(userId) => {
    const categoryDetails = await UserWalletCategory.find({
        userId: userId,
        isDeleted: false
    }).select(
        'categoryName categoryType'
    );

    return categoryDetails;
}

const getCategoryInfoById = async(userId, categoryId) => {
    const categoryDetails = await UserWalletCategory.find({
        _id: categoryId,
        userId: userId,
        isDeleted: false
    }).select(
        'categoryName categoryType'
    );

    return categoryDetails;
}

export {
    isCategoryByNameAvailable,
    createNewCategory,
    getAllCategoryInfo,
    getCategoryInfoById
};

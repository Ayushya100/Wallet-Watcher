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

const isCategoryByIdAvailable = async(userId, categoryId) => {
    const categoryDetails = await UserWalletCategory.findOne({
        _id: categoryId,
        userId: userId,
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

const getCategoryInfoByType = async(userId, categoryType) => {
    const categoryDetails = await UserWalletCategory.find({
        userId: userId,
        categoryType: categoryType,
        isDeleted: false
    }).select(
        'categoryName categoryType'
    );

    return categoryDetails;
}

const updateCategoryName = async(categoryId, payload) => {
    const updatedCategoryDetails = await UserWalletCategory.findOneAndUpdate(
        {
            _id: categoryId,
            userId: payload.userId,
            isDeleted: false
        },
        {
            $set: {
                categoryName: payload.categoryName,
                modifiedOn: Date.now(),
                modifiedBy: payload.userId
            }
        },
        {
            new: true
        }
    ).select(
        'userId categoryName categoryType'
    );

    return updatedCategoryDetails;
}

const deleteCategoryById = async(userId, categoryId) => {
    const updatedCategoryDetails = await UserWalletCategory.findOneAndUpdate(
        {
            _id: categoryId,
            userId: userId,
            isDeleted: false
        },
        {
            $set: {
                isDeleted: true,
                modifiedOn: Date.now(),
                modifiedBy: userId
            }
        },
        {
            new: true
        }
    ).select(
        'userId categoryName categoryType isDeleted'
    );

    return updatedCategoryDetails;
}

export {
    isCategoryByNameAvailable,
    createNewCategory,
    getAllCategoryInfo,
    getCategoryInfoById,
    getCategoryInfoByType,
    isCategoryByIdAvailable,
    updateCategoryName,
    deleteCategoryById
};

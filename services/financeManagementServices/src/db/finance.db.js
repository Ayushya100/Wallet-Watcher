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

export {
    isCategoryByNameAvailable,
    createNewCategory
};

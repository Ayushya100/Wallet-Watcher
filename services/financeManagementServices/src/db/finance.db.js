'use strict';

import mongoose from 'mongoose';

// Add DB Model
import { UserWalletCategoryModel, cardInfoModel, IncDetailsModel, UserFinanceModel } from 'lib-service-comms';

const UserWalletCategory = UserWalletCategoryModel(mongoose);
const CardInfo = cardInfoModel(mongoose);
const IncomeDetails = IncDetailsModel(mongoose);
const UserFinance = UserFinanceModel(mongoose);

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
        categoryName: payload.categoryName,
        createdBy: payload.userId,
        modifiedBy: payload.userId
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

const isCardByTokenAvailable = async(userId, cardToken) => {
    const cardDetails = await CardInfo.findOne({
        token: cardToken,
        userId: userId,
        isDeleted: false
    }).select(
        'token cardNumber expirationDate balance isActive'
    );

    return cardDetails;
}

const registerNewIncomeRecord = async(payload) => {
    const incomeDetails = await IncomeDetails.create({
        userId: payload.userId,
        incCatId: payload.incomeCategoryId,
        cardId: payload.cardId,
        amount: payload.amount,
        sourceDetails: payload.sourceDetail,
        dateOfCredit: payload.dateOfCredit,
        createdBy: payload.userId,
        modifiedBy: payload.userId
    });

    return incomeDetails;
}

const updateCardAmount = async(userId, cardToken, updatedAmount) => {
    const cardDetails = await CardInfo.findOneAndUpdate(
        {
            token: cardToken
        },
        {
            $set: {
                balance: updatedAmount,
                modifiedOn: Date.now(),
                modifiedBy: userId
            }
        },
        {
            new: true
        }
    ).select(
        'token cardNumber balance'
    );

    return cardDetails;
}

const getUserFinanceDetails = async(userId) => {
    const financeDetails = await UserFinance.findOne({
        userId: userId
    }).select(
        'userId availableFunds lifeTimeIncome lifeTimeInvestment lifeTimeExpenditure'
    );

    return financeDetails;
}

const updateUserFinanceDetails = async(userId, updateDetails) => {
    const financeDetails = await UserFinance.findOneAndUpdate(
        {
            userId: userId
        },
        {
            $set: updateDetails
        },
        {
            new: true
        }
    ).select(
        'userId availableFunds lifeTimeIncome lifeTimeInvestment lifeTimeExpenditure'
    );

    return financeDetails;
}

export {
    isCategoryByNameAvailable,
    createNewCategory,
    getAllCategoryInfo,
    getCategoryInfoById,
    getCategoryInfoByType,
    isCategoryByIdAvailable,
    updateCategoryName,
    deleteCategoryById,
    isCardByTokenAvailable,
    registerNewIncomeRecord,
    updateCardAmount,
    getUserFinanceDetails,
    updateUserFinanceDetails
};

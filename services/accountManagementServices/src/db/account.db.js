'use strict';

import mongoose from 'mongoose';

// Add DB Model
import { investmentAccInfoModel } from 'lib-service-comms';

const Account = investmentAccInfoModel(mongoose);

const isAccountByAccNumberAvailable = async(accountNumber) => {
    const accountInfo = await Account.findOne({
        accountNumber: accountNumber
    });
    return accountInfo;
}

const createAccount = async(userId, payload) => {
    const newAccount = await Account.create({
        userId: userId,
        token: payload.token,
        accountName: payload.accountName,
        accountNumber: payload.accountNumber,
        accountDate: payload.accountDate,
        holderName: payload.holderName,
        amount: payload.amount || 0
    });
    return newAccount;
}

const getAllAccountInfo = async(userId) => {
    const accountInfo = await Account.find(
        {
            userId: userId,
            isDeleted: false
        }
    ).select(
        'token accountName accountNumber accountDate holderName isActive'
    );
    return accountInfo;
}

const getAccountByToken = async(userId, accountToken) => {
    const accountInfo = await Account.findOne(
        {
            token: accountToken,
            userId: userId,
            isDeleted: false
        }
    ).select(
        'accountName accountNumber accountDate holderName isActive balance'
    );
    return accountInfo;
}

const updateExistingAccount = async(userId, accountToken, payload) => {
    const existingAccountInfo = await getAccountByToken(userId, accountToken);
    const updatedAccountInfo = await Account.findOneAndUpdate(
        {
            token: accountToken,
            userId: userId,
            isDeleted: false
        },
        {
            $set: {
                accountDate: payload.accountDate || existingAccountInfo.accountDate,
                holderName: payload.holderName || existingAccountInfo.holderName,
                modifiedOn: Date.now(),
                modifiedBy: userId
            }
        },
        {
            new: true
        }
    ).select(
        'accountName accountNumber accountDate holderName isActive'
    );
    return updatedAccountInfo;
}

const deactivateAccount = async(userId, accountToken) => {
    const updatedAccountInfo = await Account.findOneAndUpdate(
        {
            token: accountToken,
            userId: userId
        },
        {
            $set: {
                isActive: false,
                modifiedOn: Date.now(),
                modifiedBy: userId
            }
        },
        {
            new: true
        }
    ).select(
        'accountName accountNumber accountDate holderName isActive'
    );
    return updatedAccountInfo;
}

const reactivateAccount = async(userId, accountToken) => {
    const updatedAccountInfo = await Account.findOneAndUpdate(
        {
            token: accountToken,
            userId: userId
        },
        {
            $set: {
                isActive: true,
                modifiedOn: Date.now(),
                modifiedBy: userId
            }
        },
        {
            new: true
        }
    ).select(
        'accountName accountNumber accountDate holderName isActive'
    );
    return updatedAccountInfo;
}

const deleteAccount = async(userId, accountToken) => {
    const updatedAccountInfo = await Account.findOneAndUpdate(
        {
            token: accountToken,
            userId: userId
        },
        {
            $set: {
                isActive: false,
                isDeleted: true,
                modifiedOn: Date.now(),
                modifiedBy: userId
            }
        },
        {
            new: true
        }
    ).select(
        'accountName accountNumber accountDate holderName isActive'
    );
    return updatedAccountInfo;
}

export {
    isAccountByAccNumberAvailable,
    createAccount,
    getAllAccountInfo,
    getAccountByToken,
    updateExistingAccount,
    deactivateAccount,
    reactivateAccount,
    deleteAccount
};

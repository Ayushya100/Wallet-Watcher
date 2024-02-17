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
        'accountName accountNumber accountDate holderName isActive'
    );
    return accountInfo;
}

const getAccountById = async(userId, accountId) => {
    const accountInfo = await Account.findOne(
        {
            _id: accountId,
            userId: userId,
            isDeleted: false
        }
    ).select(
        'accountName accountNumber accountDate holderName isActive balance'
    );
    return accountInfo;
}

const updateExistingAccount = async(userId, accountId, payload) => {
    const existingAccountInfo = await getAccountById(userId, accountId);
    const updatedAccountInfo = await Account.findByIdAndUpdate(
        {
            _id: accountId,
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

export {
    isAccountByAccNumberAvailable,
    createAccount,
    getAllAccountInfo,
    getAccountById,
    updateExistingAccount
};

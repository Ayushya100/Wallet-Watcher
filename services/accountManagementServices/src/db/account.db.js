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

export {
    isAccountByAccNumberAvailable,
    createAccount,
    getAllAccountInfo,
    getAccountById
};

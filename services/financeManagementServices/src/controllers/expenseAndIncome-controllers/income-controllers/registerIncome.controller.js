'use strict';

import dbConnect from '../../../db/index.js';

const registerIncome = async(payload) => {
    try {
        const incomeDetails = await dbConnect.registerNewIncomeRecord(payload);

        if (incomeDetails) {
            const updatedAmount = Number(payload.cardCurrentBalance) + Number(payload.amount);
            await dbConnect.updateCardAmount(payload.userId, payload.cardToken, updatedAmount);

            const userCurrentFinanceInfo = await dbConnect.getUserFinanceDetails(payload.userId);

            const detailsToUpdate = {
                availableFunds: Number(userCurrentFinanceInfo.availableFunds) + Number(payload.amount),
                lifeTimeIncome: Number(userCurrentFinanceInfo.lifeTimeIncome) + Number(payload.amount),
                modifiedOn: Date.now(),
                modifiedBy: payload.userId
            };
            await dbConnect.updateUserFinanceDetails(payload.userId, detailsToUpdate);

            return {
                resType: 'REQUEST_COMPLETED',
                resMsg: 'Income Record has been added successfully!',
                data: incomeDetails,
                isValid: true
            };
        }

        return {
            resType: 'INTERNAL_SERVER_ERROR',
            resMsg: 'Income registration failed!',
            isValid: false
        };
    } catch (err) {
        return {
            resType: 'INTERNAL_SERVER_ERROR',
            resMsg: 'Some error occurred while working with db.',
            stack: err.stack,
            isValid: false
        };
    }
}

export {
    registerIncome
};

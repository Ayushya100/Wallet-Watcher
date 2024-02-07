'use strict';

const ExpDetailsModel = (mongoose) => {
    // User Expenditure Details Schema
    const expDetailSchema = new mongoose.Schema(
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            expCatId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'ExpCategory'
            },
            cardId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'CardInfo'
            },
            amount: {
                type: Number,
                required: true,
                min: 1,
                default: 1
            },
            reason: {
                type: String,
                required: false
            },
            dateOfExpense: {
                type: Date,
                default: Date.now(),
                required: true
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
            },
            isDeleted: {
                type: Boolean,
                required: true,
                default: false
            }
        }
    );
    
    // User Expenditure Details Model
    const ExpDetails = mongoose.model('ExpDetails', expDetailSchema);
    return ExpDetails;
}

export default ExpDetailsModel;

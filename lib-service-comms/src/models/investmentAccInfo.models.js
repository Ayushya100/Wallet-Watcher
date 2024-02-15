'use strict';

const investmentAccInfoModel = (mongoose) => {
    // Investment Account Info Schema
    const investmentAccInfoSchema = new mongoose.Schema(
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            accountName: {
                type: String,
                required: true
            },
            accountNumber: {
                type: String,
                required: true
            },
            accountDate: {
                type: Date,
                default: Date.now(),
                required: true
            },
            holderName: {
                type: String,
                required: true
            },
            amount: {
                type: Number,
                default: 0,
                required: false
            },
            isActive: {
                type: Boolean,
                default: true,
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

    // Investment Account Info Model
    const InvestmentAccInfo = mongoose.model('InvestmentAccInfo', investmentAccInfoSchema);
    return InvestmentAccInfo;
}

export default investmentAccInfoModel;

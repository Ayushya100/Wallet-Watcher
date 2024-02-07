'use strict';

const investmentAccInfoModel = (mongoose) => {
    // Investment Account Info Schema
    const investmentAccInfoSchema = new mongoose.Schema(
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            accName: {
                type: String,
                required: true
            },
            accNumber: {
                type: String,
                required: true
            },
            accDate: {
                type: Date,
                default: Date.now(),
                required: true
            },
            holderName: {
                type: String,
                required: true
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

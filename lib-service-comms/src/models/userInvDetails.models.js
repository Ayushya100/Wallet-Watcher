'use strict';

const InvDetailsModel = (mongoose) => {
    // User Investment Details Schema
    const invDetailSchema = new mongoose.Schema(
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            invCatId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'InvCategory'
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
                required: true
            },
            dateOfInvestment: {
                type: Date,
                required: true,
                default: Date.now()
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
    
    // User Investment Details Model
    const InvDetails = mongoose.model('InvDetails', invDetailSchema);
    return InvDetails;
}

export default InvDetailsModel;

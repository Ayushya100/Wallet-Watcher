'use strict';

const CrdExpDetailsModel = (mongoose) => {
    // User Credit Card Expense Details Schema
    const crdExpDetailsSchema = new mongoose.Schema(
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            creditCatId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'CrdExpCategory'
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
            dateOfPurchase: {
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
    
    // User Credit Card Expense Details Model
    const CrdExpDetails = mongoose.model('CrdExpDetails', crdExpDetailsSchema);
    return CrdExpDetails;
}

export default CrdExpDetailsModel;

'use strict';

const IncDetailsModel = (mongoose) => {
    // User Income Details Schema
    const userIncDetailSchema = new mongoose.Schema(
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            incCatId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'IncCategory'
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
            sourceDetails: {
                type: String,
                required: true
            },
            dateOfCredit: {
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
    
    // User Income Details Model
    const IncDetails = mongoose.model('IncDetails', userIncDetailSchema);
    return IncDetails;
}

export default IncDetailsModel;

'use strict';

const CrdExpCategoryModel = (mongoose) => {
    // User Credit Card Category Schema
    const crdExpCatSchema = new mongoose.Schema(
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            creditCategoryName: {
                type: String,
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
    
    // User Credit Card Model
    const CrdExpCategory = mongoose.model('CrdExpCategory', crdExpCatSchema);
    return CrdExpCategory;
}

export default CrdExpCategoryModel;

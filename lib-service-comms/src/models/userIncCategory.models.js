'use strict';

const IncCategoryModel = (mongoose) => {
    // User Income Category Schema
    const userIncCategorySchema = new mongoose.Schema(
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            incomeCategoryName: {
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
    
    // User Income Category Model
    const IncCategory = mongoose.model('IncCategory', userIncCategorySchema);
    return IncCategory;
}

export default IncCategoryModel;

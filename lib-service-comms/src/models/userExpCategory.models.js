'use strict';

const ExpCategoryModel = (mongoose) => {
    // User Expenditure Category Schema
    const expCategorySchema = new mongoose.Schema(
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            expCategoryName: {
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
    
    // User Expenditure Category Model
    const ExpCategory = mongoose.model('ExpCategory', expCategorySchema);
    return ExpCategory;
}

export default ExpCategoryModel;

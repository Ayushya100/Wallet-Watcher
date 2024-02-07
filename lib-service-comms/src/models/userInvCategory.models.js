'use strict';

const InvCategoryModel = (mongoose) => {
    // User Investment Category Schema
    const userInvCategorySchema = new mongoose.Schema(
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            invAccId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'InvAccInfo'
            },
            investCategoryName:{
                type: String,
                required: true,
                trim: true
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
    
    // User Investment Category Model
    const InvCategory = mongoose.model('InvCategory', userInvCategorySchema);
    return InvCategory;
}

export default InvCategoryModel;

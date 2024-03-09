'use strict';

const UserWalletCategoryModel = (mongoose) => {
    // User Wallet Category Schema
    const userWalletCategorySchema = new mongoose.Schema(
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            categoryType: {
                type: String,
                required: true,
                trim: true
            },
            categoryName: {
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
    
    // User Credit Card Model
    const UserWalletCategory = mongoose.model('UserWalletCategory', userWalletCategorySchema);
    return UserWalletCategory;
}

export default UserWalletCategoryModel;

'use strict';

const DashboardSettingsModels = (mongoose) => {
    // Dashboard Settings Schema
    const dashboardSchema = new mongoose.Schema(
        {
            categoryName: {
                type: String,
                required: true,
                unique: true
            },
            categoryDescription: {
                type: String,
                required: true
            },
            type: {
                type: String,
                required: true,
                default: 'Boolean'
            },
            createdOn: {
                type: Date,
                required: true,
                default: Date.now()
            },
            createdBy: {
                type: String,
                required: false,
                trim: true,
                default: 'SYSTEM'
            },
            modifiedOn: {
                type: Date,
                required: true,
                default: Date.now()
            },
            modifiedBy: {
                type: String,
                required: true,
                trim: true,
                default: 'SYSTEM'
            },
            isDeleted: {
                type: Boolean,
                default: false,
                required: false
            }
        }
    );

    // Dashboard Settings Model
    const DashboardSettings = mongoose.model('DashboardSettings', dashboardSchema);
    return DashboardSettings;
}

export default DashboardSettingsModels;

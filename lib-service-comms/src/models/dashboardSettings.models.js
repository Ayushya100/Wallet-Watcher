'use strict';

const DashboardSettingsModels = (mongoose) => {
    // Dashboard Settings Schema
    const dashboardSchema = new mongoose.Schema(
        {
            categoryName: {
                type: String,
                required: true
            },
            categoryDescription: {
                type: String,
                required: true
            },
            categoryType: {
                type: String,
                required: true
            },
            type: {
                type: String,
                required: true,
                default: 'Boolean'
            },
            isPeriodic: {
                type: Boolean,
                required: true,
                default: true
            },
            duration: {
                type: String,
                required: false,
                default: 'daily'
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

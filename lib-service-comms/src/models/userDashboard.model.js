"use strict";

const UserDashboardModel = (mongoose) => {
    // User dashboard Schema
    const userDashboardSchema = new mongoose.Schema(
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            expBarChart: {
                type: Boolean,
                default: true
            },
            expPieChart: {
                type: Boolean,
                default: true
            },
            creditBarChart: {
                type: Boolean,
                default: true
            },
            creditPieChart: {
                type: Boolean,
                default: true
            },
            incomeBarChart: {
                type: Boolean,
                default: true
            },
            incomePieChart: {
                type: Boolean,
                default: true
            },
            investBarChart: {
                type: Boolean,
                default: true
            },
            investPieChart: {
                type: Boolean,
                default: true
            },
            perDayExpPieChart: {
                type: Boolean,
                default: true
            },
            perDayExpPieChart: {
                type: Boolean,
                default: true
            },
            perDayCreditBarChart: {
                type: Boolean,
                default: true
            },
            perDayCreditPieChart: {
                type: Boolean,
                default: true
            },
            perDayInvestBarChart: {
                type: Boolean,
                default: true
            },
            perDayInvestPieChart: {
                type: Boolean,
                default: true
            },
            perDayIncomeBarChart: {
                type: Boolean,
                default: true
            },
            perDayIncomePieChart: {
                type: Boolean,
                default: true
            },
            perDayExpReport: {
                type: Boolean,
                default: true
            },
            perDayIncomeReport: {
                type: Boolean,
                default: true
            },
            perDayInvestReport: {
                type: Boolean,
                default: true
            },
            perDayTotalReport: {
                type: Boolean,
                default: true
            },
            customExpBarChart: {
                type: Boolean,
                default: true
            },
            customExpPieChart: {
                type: Boolean,
                default: true
            },
            customExpLineChart: {
                type: Boolean,
                default: true
            },
            customCreditBarChart: {
                type: Boolean,
                default: true
            },
            customCreditPieChart: {
                type: Boolean,
                default: true
            },
            customCreditLineChart: {
                type: Boolean,
                default: true
            },
            customInvestBartChart: {
                type: Boolean,
                default: true
            },
            customInvestPieChart: {
                type: Boolean,
                default: true
            },
            customInvestLineChart: {
                type: Boolean,
                default: true
            },
            customIncomeBarChart: {
                type: Boolean,
                default: true
            },
            customIncomePieChart: {
                type: Boolean,
                default: true
            },
            customIncomeLineChart: {
                type: Boolean,
                default: true
            },
            customExpReport: {
                type: Boolean,
                default: true
            },
            customIncomeReport: {
                type: Boolean,
                default: true
            },
            customInvestReport: {
                type: Boolean,
                default: true
            },
            customTotalReport: {
                type: Boolean,
                default: true
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
                default: "SYSTEM"
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
                default: "SYSTEM"
            },
            isDeleted: {
                type: Boolean,
                default: false,
                required: false
            }
        }
    );
    
    // User dashboard Model
    const UserDashboard = mongoose.model('UserDashboard', userDashboardSchema);
    return UserDashboard;
}

export default UserDashboardModel;

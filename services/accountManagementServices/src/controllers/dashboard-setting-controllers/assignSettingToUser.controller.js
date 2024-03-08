'use strict';

import dbConnect from '../../db/index.js';

const getUsersListToAssignSettings = async(usersId, settingId) => {
    let usersAlreadyAssigned = await dbConnect.getUsersWithAssignedSetting(usersId, settingId);
    usersAlreadyAssigned = usersAlreadyAssigned.map(({userId}) => String(userId));

    if (usersAlreadyAssigned.length === 0) {
        return usersId;
    }

    const usersWithoutAssignment = usersId.filter(userId => !usersAlreadyAssigned.includes(userId));
    return usersWithoutAssignment;
}

const validateUsersToAssign = async(usersId) => {
    let usersToCheck;

    if ((usersId.length > 0) && !(usersId[0] == '')) {
        usersToCheck = await dbConnect.getSelectedUsersId(usersId);
    } else {
        usersToCheck = await dbConnect.getAllUsersId();
    }

    usersToCheck = usersToCheck.map(({_id}) => String(_id));

    if (usersToCheck.length === 0) {
        return {
            data: usersToCheck,
            isValid: false
        };
    }

    return {
        data: usersToCheck,
        isValid: true
    };
}

const assignSettingToUser = async(payload) => {
    try {
        const usersId = payload.usersId;
        const settingId = payload.settingId;
        payload.value = ((payload.type === 'Boolean') && (payload.value.toLowerCase() === 'false')) ? false : true;

        let usersToCheck = await validateUsersToAssign(usersId);

        if (!usersToCheck.isValid) {
            return {
                resType: 'NOT_FOUND',
                resMsg: 'NO USER AVAILABLE TO ASSIGN',
                isValid: false
            };
        }

        usersToCheck = usersToCheck.data;
        let usersToAssignSettings = await getUsersListToAssignSettings(usersToCheck, settingId);

        if (usersToAssignSettings.length === 0) {
            return {
                resType: 'CONTENT_NOT_AVAILABLE',
                resMsg: 'No User Available to Assign Setting',
                data: [],
                isValid: false
            };
        }

        usersToAssignSettings = usersToAssignSettings.map(userId => ({
            userId: userId,
            settingId: settingId,
            type: payload.type || 'Boolean',
            value: payload.value
        }));

        const createUserDashboard = await dbConnect.createUserDashboardSettings(usersToAssignSettings);

        if (createUserDashboard.length === 0) {
            return {
                resType: 'UNPROCESSABLE_CONTENT',
                resMsg: 'Failed to assign setting to users',
                isValid: false
            };
        }

        return {
            resType: 'REQUEST_COMPLETED',
            resMsg: 'Settings assigned to Users Successfully',
            data: createUserDashboard,
            isValid: true
        };
    } catch (err) {
        return {
            resType: 'INTERNAL_SERVER_ERROR',
            resMsg: 'Some error occurred while working with db.',
            stack: err.stack,
            isValid: false
        };
    }
}

export {
    assignSettingToUser
};

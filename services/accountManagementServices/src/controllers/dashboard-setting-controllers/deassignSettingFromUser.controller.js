'use strict';

import dbConnect from '../../db/index.js';

const getUsersListToDeassignSettings = async(settingId, usersId) => {
    let usersToDeassign;

    if ((usersId.length > 0) && !(usersId[0] == '')) {
        usersToDeassign = await dbConnect.getUsersWithAssignedSetting(usersId, settingId);
    } else {
        usersToDeassign = await dbConnect.getAllUsersWithAssignedSetting(settingId);
    }
    return usersToDeassign;
}

const deassignSettingFromUser = async(settingId, usersId) => {
    try {
        let usersToDeassignSettings = await getUsersListToDeassignSettings(settingId, usersId);
        
        if (usersToDeassignSettings.length === 0) {
            return {
                resType: 'NOT_FOUND',
                resMsg: 'No User Available to Deassign Setting',
                isValid: false
            };
        }

        usersToDeassignSettings = usersToDeassignSettings.map(({_id}) => String(_id));

        const updatedUserSettingInfo = await dbConnect.deassignUserSettings(usersToDeassignSettings);

        return {
            resType: 'REQUEST_COMPLETED',
            resMsg: 'Settings assigned to Users Successfully',
            data: updatedUserSettingInfo,
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
    deassignSettingFromUser
};

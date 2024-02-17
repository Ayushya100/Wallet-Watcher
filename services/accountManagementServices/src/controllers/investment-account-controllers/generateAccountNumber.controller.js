'use strict';

import dbConnect from '../../db/index.js';

const generateAccountNumber = async() => {
    try {
        let isAccountGenerationRequired = true;
        let randomAccountNumber = '8';
        
        while (isAccountGenerationRequired) {
            for (let i = 0; i < 15; i++) {
                randomAccountNumber += Math.floor(Math.random() * 10);
            }
            randomAccountNumber = Number(randomAccountNumber);

            const isAccountNumberInUse = await dbConnect.isAccountByAccNumberAvailable(randomAccountNumber);
            
            if (!isAccountNumberInUse) {
                isAccountGenerationRequired = false;
            } else {
                randomAccountNumber = '8';
            }
        }
        return {
            resType: 'SUCCESS',
            resMsg: 'New card number generated',
            data: randomAccountNumber,
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
    generateAccountNumber
};

'use strict';

import dbConnect from '../../db/index.js';

const generateCardNumber = async() => {
    try {
        let isCardGenerationRequired = true;
        let randomCardNumber = '9';

        while(isCardGenerationRequired) {
            for (let i = 0; i < 15; i++) {
                randomCardNumber += Math.floor(Math.random() * 10);
            }
            randomCardNumber = Number(randomCardNumber);
            
            const isCardNumberInUse = await dbConnect.isCardByCardNumberAvailable(randomCardNumber);
            
            if (!isCardNumberInUse) {
                isCardGenerationRequired = false;
            } else {
                randomCardNumber = '9';
            }
        }
        return {
            resType: 'SUCCESS',
            resMsg: 'New card number generated',
            data: randomCardNumber,
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
    generateCardNumber
};

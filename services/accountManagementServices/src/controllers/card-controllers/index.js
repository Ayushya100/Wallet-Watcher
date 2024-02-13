'use strict';

import { validateRegisterCardPayload } from './validatePayload.controller.js';
import { checkCardByCardNumber, registerNewCard } from './registerCard.controller.js';
import { getAllCardsInfo, getCardByIdInfo } from './getCardInfo.controller.js';

export default {
    validateRegisterCardPayload,
    checkCardByCardNumber,
    registerNewCard,
    getAllCardsInfo,
    getCardByIdInfo
};

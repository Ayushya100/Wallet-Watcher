'use strict';

import { validateRegisterCardPayload, validateUpdateCardPayload } from './validatePayload.controller.js';
import { checkCardByCardNumber, registerNewCard } from './registerCard.controller.js';
import { getAllCardsInfo, getCardByIdInfo } from './getCardInfo.controller.js';
import { updateCardinfo } from './updateCardInfo.controller.js';
import { isCardByIdExist } from './shared.controller.js';
import { deactivateCard } from './deactivateCard.route.js';

export default {
    validateRegisterCardPayload,
    checkCardByCardNumber,
    registerNewCard,
    getAllCardsInfo,
    getCardByIdInfo,
    isCardByIdExist,
    validateUpdateCardPayload,
    updateCardinfo,
    deactivateCard
};

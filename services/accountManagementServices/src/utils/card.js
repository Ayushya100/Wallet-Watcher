'use strict';

import crypto from 'crypto';

const maskCardNumber = (cardNumber) => {
    const visibleDigits = cardNumber.slice(-4);
    let maskedDigits = '*'.repeat(cardNumber.length - 4);
    maskedDigits += visibleDigits;
    return maskedDigits;
}

const generateToken = (cardNumber, byteSize = 16) => {
    const method = process.env.CARD_TOKEN_METHOD;
    const hashedData = crypto.createHash(method).update(cardNumber).digest('hex');
    const randomBytes = crypto.randomBytes(byteSize).toString('hex');
    const token = hashedData + randomBytes;
    return token;
}

const encryptData = (data) => {
    const method = process.env.ENCRYPTION_METHOD;
    const encryptionKey = process.env.ENCRYPTION_KEY;
    const iv = process.env.ENCRYPTION_INITIALIZATION;

    const cipher = crypto.createCipheriv(method, Buffer.from(encryptionKey, 'hex'), Buffer.from(iv, 'hex'));
    let encryptedData = cipher.update(data, 'utf8', 'hex');
    encryptedData += cipher.final('hex');
    encryptedData = iv + ':' + encryptedData;
    return encryptedData;
}

const decryptData = (encryptedData) => {
    const method = process.env.ENCRYPTION_METHOD;
    const encryptionKey = process.env.ENCRYPTION_KEY;

    const [iv, encryptedText] = encryptedData.split(':');
    const decipher = crypto.createDecipheriv(method, Buffer.from(encryptionKey, 'hex'), Buffer.from(iv, 'hex'));
    let decryptedData = decipher.update(encryptedText, 'hex', 'utf8');
    decryptedData += decipher.final('utf8');
    return decryptedData;
}

export {
    maskCardNumber,
    generateToken,
    encryptData,
    decryptData
};
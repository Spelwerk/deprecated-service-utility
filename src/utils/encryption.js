const cryptoJS = require('crypto-js');

/**
 * @param {string} input
 * @param {string} secret
 * @returns {string}
 */
const SHA256 = (input, secret) => {
    return cryptoJS.HmacSHA256(input, secret).toString();
};

/**
 * @param {string} input
 * @param {string} secret
 * @returns {string}
 */
const AESEncrypt = (input, secret) => {
    return cryptoJS.AES.encrypt(input, secret).toString();
};

/**
 * @param {string} input
 * @param {string} secret
 * @returns {string}
 */
const AESDecrypt = (input, secret) => {
    const bytes = cryptoJS.AES.decrypt(input.toString(), secret);
    return bytes.toString(cryptoJS.enc.Utf8);
};

module.exports = {
    SHA256,
    AESEncrypt,
    AESDecrypt,
};

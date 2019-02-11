const bcrypt = require('bcrypt');
const { SHA256, AESEncrypt, AESDecrypt } = require('../utils/encryption');

module.exports = class Encryption {
    /**
     * @constructor
     * @param {string} aesSecret
     * @param {string} shaSecret
     * @param {number} salt
     */
    constructor(aesSecret, shaSecret, salt) {
        this.secret = {
            AES: aesSecret,
            SHA: shaSecret,
        };
        this.salt = salt;
    }

    /**
     * @public
     * @param {string} input
     * @returns {string}
     */
    simpleEncrypt(input) {
        return AESEncrypt(input, this.secret.AES);
    }

    /**
     * @public
     * @param {string} input
     * @returns {string}
     */
    simpleDecrypt(input) {
        return AESDecrypt(input, this.secret.AES);
    }

    /**
     * @public
     * @param {string} input
     * @returns {string}
     */
    strongEncrypt(input) {
        const shaString = SHA256(input, this.secret.SHA);
        return AESEncrypt(shaString, this.secret.AES);
    }

    /**
     * @public
     * @param {string} input
     * @param {string} comparison
     * @returns {boolean}
     */
    strongCompare(input, comparison) {
        const shaString = SHA256(input, this.secret.SHA);
        const aesString = AESDecrypt(comparison, this.secret.AES);
        return shaString === aesString;
    }

    /**
     * @public
     * @param {string} input
     * @returns {string}
     */
    async onionEncrypt(input) {
        const shaString = SHA256(input, this.secret.SHA);
        const encrypted = await bcrypt.hash(shaString, this.salt);
        return AESEncrypt(encrypted, this.secret.AES);
    }

    /**
     * @public
     * @param {string} input
     * @param {string} comparison
     * @returns {boolean}
     */
    async onionCompare(input, comparison) {
        const shaString = SHA256(input, this.secret.SHA);
        const aesString = AESDecrypt(comparison, this.secret.AES);
        return bcrypt.compare(shaString, aesString);
    }
};

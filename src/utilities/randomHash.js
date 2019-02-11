const crypto = require('crypto');
const UUID = require('uuid/v4');

/**
 * @public
 * @param {number} length
 * @returns {string}
 */
const hex = (length) => crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);

/**
 * @public
 * @returns {string}
 */
const uniqueHex = () => `${hex(24)}-${hex(8)}-${hex(8)}-${hex(24)}`;

/**
 * @public
 * @returns {string}
 */
const uuid = () => UUID();

module.exports = {
    hex,
    uniqueHex,
    uuid,
};

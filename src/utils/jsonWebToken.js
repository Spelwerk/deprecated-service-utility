const jsonWebToken = require('jsonwebtoken');
const commonErrors = require('spelwerk-common-errors');
const dateInteger = require('../utilities/dateInteger');

const {
    JWTError,
    JWTValidityError,
} = commonErrors;

/**
 * @param {object} payload
 * @param {number} expiry
 * @param {string} secret
 * @param {string} issuer
 * @returns {string}
 */
const encode = (payload, expiry, secret, issuer) => {
    const content = {
        ...payload,
        iss: issuer,
        iat: dateInteger.now(),
        exp: expiry,
    };

    return jsonWebToken.sign(content, secret);
};

/**
 * @param {string} token
 * @param {string} secret
 * @param {string} issuer
 * @returns {object}
 */
const decode = (token, secret, issuer) => {
    try {
        const decoded = jsonWebToken.verify(token, secret);
        const now = dateInteger.now();

        if (decoded.iss !== issuer) {
            return new JWTValidityError('iss is not correct');
        }

        if (decoded.iat > now) {
            return new JWTValidityError('iat > now');
        }

        if (decoded.exp < now) {
            return new JWTValidityError('exp < now');
        }

        return decoded;
    } catch (err) {
        throw new JWTError;
    }
};

module.exports = {
    encode,
    decode,
};

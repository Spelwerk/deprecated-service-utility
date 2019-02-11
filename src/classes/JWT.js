const UUID = require('uuid/v1');
const dateInteger = require('../utilities/dateInteger');
const jsonWebToken = require('../utils/jsonWebToken');

module.exports = class JWT {
    /**
     * @constructor
     * @param {string} secret
     * @param {string} iss
     */
    constructor(secret, iss) {
        this.secret = secret;
        this.iss = iss;
    }

    /**
     * @public
     * @param {number} days
     * @returns {{refreshToken: string, uuid: string}}
     */
    getRefreshToken(days) {
        const expiry = dateInteger.addDays(dateInteger.now(), days);
        const uuid = UUID();
        const payload = { uuid };
        const refreshToken = jsonWebToken.encode(payload, expiry, this.secret, this.iss);

        return { refreshToken, uuid };
    }

    /**
     * @public
     * @param {object} data
     * @param {number} minutes
     * @returns {{accessToken: string, expiry: number}}
     */
    getAccessToken(data, minutes) {
        const expiry = dateInteger.addMinutes(dateInteger.now(), minutes);
        const payload = { account: data };
        const accessToken = jsonWebToken.encode(payload, expiry, this.secret, this.iss);

        return { accessToken, expiry };
    }

    /**
     * @public
     * @param {string} token
     * @returns {object}
     */
    decodeToken(token) {
        return jsonWebToken.decode(token, this.secret, this.iss);
    }
};

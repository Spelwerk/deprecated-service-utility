const { describe, it } = require('mocha');
const { assert } = require('chai');
const JWT = require('../../src/classes/JWT');

describe('JWT', () => {
    const jwt = new JWT('secret', 'issuer');

    let refresh;
    let access;

    it('constructor', () => {
        assert.isString(jwt.secret);
        assert.isString(jwt.iss);
    });

    it('getRefreshToken', () => {
        const result = jwt.getRefreshToken(20);
        assert.isObject(result);
        assert.isString(result.refreshToken);
        assert.isString(result.uuid);

        refresh = result.refreshToken;
    });

    it('decodeRefreshToken', () => {
        const result = jwt.decodeToken(refresh);
        assert.isObject(result);
        assert.isString(result.iss);
        assert.isNumber(result.iat);
        assert.isNumber(result.exp);
        assert.isString(result.uuid);
    });

    it('getAccessToken', () => {
        const result = jwt.getAccessToken({ id: 1 }, 5);
        assert.isObject(result);
        assert.isString(result.accessToken);
        assert.isNumber(result.expiry);

        access = result.accessToken;
    });

    it('decodeAccessToken', () => {
        const result = jwt.decodeToken(access);
        assert.isObject(result);
        assert.isString(result.iss);
        assert.isNumber(result.iat);
        assert.isNumber(result.exp);
        assert.isObject(result.account);
        assert.isNumber(result.account.id);
    });
});

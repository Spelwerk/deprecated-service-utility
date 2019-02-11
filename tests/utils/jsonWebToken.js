const { describe, it } = require('mocha');
const { assert } = require('chai');
const jsonWebToken = require('../../src/utils/jsonWebToken');
const dateInteger = require('../../src/utilities/dateInteger');

describe('jsonWebToken', () => {
    let token;

    it('encode', async () => {
        const expiry = dateInteger.addHours(dateInteger.now(), 10);
        token = jsonWebToken.encode({ id: 1 }, expiry, 'secret', 'issuer');
        assert.isString(token);
    });

    it('decode', async () => {
        const result = jsonWebToken.decode(token, 'secret', 'issuer');
        assert.isObject(result);
        assert.isNumber(result.id);
    });
});

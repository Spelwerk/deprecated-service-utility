const { describe, it } = require('mocha');
const { assert } = require('chai');
const randomHash = require('../../src/utilities/randomHash');

describe('randomHash', () => {
    it('hex', async () => {
        const result = randomHash.hex(20);
        assert.isString(result);
        assert.equal(result.length, 20);
    });

    it('uniqueHex', async () => {
        const result = randomHash.uniqueHex();
        assert.isString(result);
        assert.equal(result.length, 67);
    });

    it('uuid', async () => {
        const result = randomHash.uuid();
        assert.isString(result);
        assert.equal(result.length, 36);
    });
});

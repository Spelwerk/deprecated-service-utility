const { describe, it } = require('mocha');
const { assert } = require('chai');
const Encryption = require('../../src/classes/Encryption');

describe('Encryption', () => {
    const encryption = new Encryption('aes', 'sha', 1);

    let simple;
    let strong;
    let onion;

    it('constructor', () => {
        assert.isObject(encryption.secret);
        assert.isString(encryption.secret.AES);
        assert.isString(encryption.secret.SHA);
        assert.isNumber(encryption.salt);
    });

    it('simpleEncrypt', () => {
        simple = encryption.simpleEncrypt('one');
        assert.isString(simple);
    });

    it('simpleDecrypt', () => {
        const result = encryption.simpleDecrypt(simple);
        assert.equal(result, 'one');
    });

    it('strongEncrypt', () => {
        strong = encryption.strongEncrypt('one');
        assert.isString(strong);
    });

    it('strongEncrypt', () => {
        const result1 = encryption.strongCompare('one', strong);
        assert.isTrue(result1);

        const result2 = encryption.strongCompare('wrong', strong);
        assert.isFalse(result2);
    });

    it('onionEncrypt', async () => {
        onion = await encryption.onionEncrypt('one');
        assert.isString(onion);
    });

    it('onionEncrypt', async () => {
        const result1 = await encryption.onionCompare('one', onion);
        assert.isTrue(result1);

        const result2 = await encryption.onionCompare('two', onion);
        assert.isFalse(result2);
    });
});

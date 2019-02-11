const { describe, it } = require('mocha');
const { assert } = require('chai');
const encryption = require('../../src/utils/encryption');

describe('encryption', () => {
    let aes;

    it('SHA256', async () => {
        const result = encryption.SHA256('test-string', 'secret');
        assert.isString(result);
    });

    it('AESEncrypt', async () => {
        aes = encryption.AESEncrypt('test-string', 'secret');
        assert.isString(aes);
    });

    it('AESDecrypt', async () => {
        const result = encryption.AESDecrypt(aes, 'secret');
        assert.isString(result);
        assert.equal(result, 'test-string');
    });
});

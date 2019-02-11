const { describe, it } = require('mocha');
const { assert } = require('chai');
const index = require('../../src/main/index');

describe('Main Service', () => {
    it('typeof', async () => {
        assert.isTrue(typeof index.Encryption === 'function');
        assert.isTrue(typeof index.JWT === 'function');
        assert.isTrue(typeof index.Mailer === 'function');

        assert.isTrue(typeof index.common === 'object');
        assert.isTrue(typeof index.dateInteger === 'object');
        assert.isTrue(typeof index.randomHash === 'object');
        assert.isTrue(typeof index.reducer === 'object');
    });
});

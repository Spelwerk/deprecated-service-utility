const { describe, it } = require('mocha');
const { assert } = require('chai');
const common = require('../../src/utilities/common');

describe('common', () => {
    it('contains', async () => {
        const array = [ 'one', 'two', 'three' ];

        const result1 = common.contains(array, 'one');
        assert.isTrue(result1);

        const result2 = common.contains(array, 'four');
        assert.isFalse(result2);

        const result3 = common.contains('he_llo', '_');
        assert.isTrue(result3);

        const result4 = common.contains('he_ll_o', ':');
        assert.isFalse(result4);
    });

    it('isEmpty', async () => {
        const result1 = common.isEmpty();
        assert.isTrue(result1);

        const result2 = common.isEmpty(null);
        assert.isTrue(result2);

        const result3 = common.isEmpty('');
        assert.isTrue(result3);

        const result4 = common.isEmpty('something');
        assert.isFalse(result4);
    });
});

const { describe, it } = require('mocha');
const { assert } = require('chai');
const { contains } = require('../../src/utilities/common');
const reducer = require('../../src/utilities/reducer');

describe('reducer', () => {
    it('reducer', async () => {
        const array1 = [ 'one', 'two', 'three' ];
        const array2 = [ 'four', 'five' ];
        const result = reducer.reducer([ array1, array2 ]);
        assert.isArray(result);
        assert.isTrue(contains(result, 'five'));
    });
});

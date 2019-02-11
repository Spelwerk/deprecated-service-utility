const { describe, it } = require('mocha');
const { assert } = require('chai');
const dateInteger = require('../../src/utilities/dateInteger');

describe('dateInteger', () => {
    it('now', async () => {
        const result = dateInteger.now();
        assert.isNumber(result);
    });

    it('addMinutes', async () => {
        const result = dateInteger.addMinutes(dateInteger.now(), 10);
        assert.isNumber(result);
    });

    it('addHours', async () => {
        const result = dateInteger.addHours(dateInteger.now(), 10);
        assert.isNumber(result);
    });

    it('addDays', async () => {
        const result = dateInteger.addDays(dateInteger.now(), 10);
        assert.isNumber(result);
    });

    it('addDaysHoursMinutes', async () => {
        const result = dateInteger.addDaysHoursMinutes(dateInteger.now(), 10, 20, 30);
        assert.isNumber(result);
    });
});

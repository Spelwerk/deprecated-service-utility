const { describe, it } = require('mocha');
const { assert } = require('chai');
const Mailer = require('../../src/classes/Mailer');

describe('Mailer', () => {
    const mailer = new Mailer('key', 'domain', 'from');

    it('constructor', () => {
        assert.isString(mailer.from);
        assert.isFalse(mailer.isProduction);
    });

    it('setProduction', async () => {
        mailer.setProduction(false);
        assert.isFalse(mailer.isProduction);
    });

    it('sendMail', async () => {
        const result = await mailer.sendMail('recipient', 'subject', 'message');
        assert.isTrue(result);
    });
});

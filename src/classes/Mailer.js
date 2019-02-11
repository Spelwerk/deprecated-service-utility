const mailgunJS = require('mailgun-js');
const logger = require('../utils/logger');

module.exports = class Mailer {
    /**
     * @constructor
     * @param {string} apiKey
     * @param {string} domain
     * @param {string} from
     */
    constructor(apiKey, domain, from) {
        this.mailGun = mailgunJS({ apiKey, domain });
        this.from = from;
        this.isProduction = false;
    }

    /**
     * @public
     * @param {boolean} isProduction
     */
    setProduction(isProduction) {
        this.isProduction = isProduction;
    }

    /**
     * @public
     * @param {string} to
     * @param {string} subject
     * @param {string} text
     * @param {string} html
     * @returns {Promise<boolean>}
     */
    async sendMail(to, subject, text, html) {
        const data = {
            from: this.from,
            to,
            subject,
            text,
            html,
        };

        if (!this.isProduction) {
            logger.debug(`Would have sent email to [ ${to} ] with subject [ ${subject} ] if this was production.`);
            return true;
        }

        return this.mailGun.messages().send(data);
    }
};

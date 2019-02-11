/* eslint-disable global-require */

process.env.NODE_ENV = 'development';

const { describe } = require('mocha');

describe('Classes', () => {
    require('./classes/ChaiRequest');
    require('./classes/Encryption');
    require('./classes/JWT');
    require('./classes/Mailer');
});

describe('Services', () => {
    require('./utilities/common');
    require('./utilities/dateInteger');
    require('./utilities/randomHash');
    require('./utilities/reducer');
});

describe('Internal Utilities', () => {
    require('./utils/encryption');
    require('./utils/jsonWebToken');
});

describe('Service', () => {
    require('./main/index');
});

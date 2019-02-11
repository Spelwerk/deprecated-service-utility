const { describe, it, before } = require('mocha');
const { assert } = require('chai');
const express = require('express');
const bodyParser = require('body-parser');
const ChaiRequest = require('../../src/classes/ChaiRequest');

const port = 5000;
const loginPath = '/login';
const administrator = {
    email: '',
    password: '',
};
const tokenKeys = {
    accessToken: 'x-access-token',
    refreshRoken: 'x-refresh-token',
};

const mockServer = async (mockPort) => {
    const app = express();
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.post('/login', async (req, res) => {
        res.status(200).send({
            refreshToken: 'refreshToken',
            accessToken: 'accessToken',
            session: {
                expiry: 100,
                id: 1,
                roles: { USER: true },
            },
        });
    });

    app.post('/post', async (req, res) => {
        res.status(200).send({
            body: req.body,
            stuff: 1,
        });
    });

    app.get('/get', async (req, res) => {
        res.status(200).send({
            body: 'body',
            stuff: 1,
        });
    });

    app.put('/put', async (req, res) => {
        res.status(204).send();
    });

    app.delete('/delete', async (req, res) => {
        res.status(204).send();
    });

    app.listen(mockPort);
};

describe('ChaiRequest', () => {
    const request = new ChaiRequest(port, loginPath, administrator, tokenKeys);

    before(() => {
        mockServer(port, loginPath);
    });

    it('constructor', async () => {
        assert.isString(request.basePath);
        assert.isString(request.loginPath);
        assert.isObject(request.admin);
        assert.isObject(request.session);
        assert.isObject(request.Key);
    });

    it('LOGIN', async () => {
        await request.LOGIN('user', 'pass');

        assert.isString(request.refreshToken);
        assert.isString(request.accessToken);
        assert.isObject(request.session);
        assert.isNumber(request.session.expiry);
        assert.isNumber(request.session.id);
        assert.isObject(request.session.roles);
        assert.isTrue(request.session.roles.USER);
    });

    it('REFRESH', async () => {
        await request.REFRESH();

        assert.isString(request.refreshToken);
        assert.isString(request.accessToken);
        assert.isObject(request.session);
        assert.isNumber(request.session.expiry);
        assert.isNumber(request.session.id);
        assert.isObject(request.session.roles);
        assert.isTrue(request.session.roles.USER);
    });

    it('GET', async () => {
        const result = await request.GET(200, '/get');

        assert.isString(result.body);
        assert.isNumber(result.stuff);
    });

    it('POST', async () => {
        const result = await request.POST(200, '/post', { one: 1, two: 'two' });

        assert.isNumber(result.body.one);
        assert.isString(result.body.two);
        assert.isNumber(result.stuff);
    });

    it('PUT', async () => {
        await request.PUT(204, '/put', { one: 1, two: 'two' });
    });

    it('DELETE', async () => {
        await request.DELETE(204, '/delete');
    });
});

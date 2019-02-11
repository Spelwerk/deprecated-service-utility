const chai = require('chai');
const chaiHttp = require('chai-http');

const { assert } = chai;
chai.use(chaiHttp);

module.exports = class ChaiRequest {
    /**
     * @constructor
     * @param {number} port
     * @param {string} loginPath
     * @param {{email: string, password: string}} administrator
     * @param {{refreshToken: string, accessToken: string}} keys
     */
    constructor(port, loginPath, administrator, keys) {
        this.basePath = `http://localhost:${port}`;
        this.loginPath = loginPath;

        this.admin = {
            email: administrator.email,
            password: administrator.password,
        };

        this.refreshToken = '';
        this.accessToken = '';

        this.session = {};

        this.Key = {
            RefreshToken: keys.refreshToken,
            AccessToken: keys.accessToken,
        };
    }

    /**
     * @public
     * @param {string} email
     * @param {string} password
     */
    async LOGIN(email, password) {
        const { basePath, loginPath, admin } = this;

        email = email || admin.email;
        password = password || admin.password;

        const response = await chai
            .request(basePath)
            .post(loginPath)
            .send({
                email,
                password,
            });

        assert.equal(response.status, 200);

        const { refreshToken, accessToken, session } = response.body;

        this.refreshToken = refreshToken;
        this.accessToken = accessToken;
        this.session = session;
    }

    /**
     * @public
     */
    async REFRESH() {
        if (!this.accessToken) {
            await this.LOGIN();
        }
    }

    /**
     * @public
     * @param {number} expectStatus
     * @param {string} path
     * @param {object} payload
     * @returns {Promise<object>}
     */
    async POST(expectStatus, path, payload) {
        const { basePath, Key, accessToken, refreshToken } = this;
        const { AccessToken, RefreshToken } = Key;

        const response = await chai
            .request(basePath)
            .post(path)
            .set({
                [AccessToken]: accessToken,
                [RefreshToken]: refreshToken,
            })
            .send(payload);

        assert.equal(response.status, expectStatus);

        return response.body;
    }

    /**
     * @public
     * @param {number} expectStatus
     * @param {string} path
     * @returns {Promise<object>}
     */
    async GET(expectStatus, path) {
        const { basePath, Key, accessToken, refreshToken } = this;
        const { AccessToken, RefreshToken } = Key;

        const response = await chai
            .request(basePath)
            .get(path)
            .set({
                [AccessToken]: accessToken,
                [RefreshToken]: refreshToken,
            });

        assert.equal(response.status, expectStatus);

        return response.body;
    }

    /**
     * @public
     * @param {number} expectStatus
     * @param {string} path
     * @param {object} payload
     * @returns {Promise<object>}
     */
    async PUT(expectStatus, path, payload) {
        const { basePath, Key, accessToken, refreshToken } = this;
        const { AccessToken, RefreshToken } = Key;

        const response = await chai
            .request(basePath)
            .put(path)
            .set({
                [AccessToken]: accessToken,
                [RefreshToken]: refreshToken,
            })
            .send(payload);

        assert.equal(response.status, expectStatus);

        return response.body;
    }

    /**
     * @public
     * @param {number} expectStatus
     * @param {string} path
     * @returns {Promise<object>}
     */
    async DELETE(expectStatus, path) {
        const { basePath, Key, accessToken, refreshToken } = this;
        const { AccessToken, RefreshToken } = Key;

        const response = await chai
            .request(basePath)
            .delete(path)
            .set({
                [AccessToken]: accessToken,
                [RefreshToken]: refreshToken,
            });

        assert.equal(response.status, expectStatus);

        return response.body;
    }
};

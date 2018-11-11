const assert = require('assert');
const request = require('supertest');
const app = require('../app');

describe('The express app', () => {
    it('GET request to /api returns a list of collection names', (done) => {
        request(app)
            .get('/api')
            .end((err,response) => {
                assert(Array.isArray(response.body));
                done();
            });
    });
});


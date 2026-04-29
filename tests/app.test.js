const request = require('supertest');
const app = require('../src/app');

describe('GET /', () => {
    it('should return 200 status code', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
    });
});
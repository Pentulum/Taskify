const request = require('supertest');
const app = require('../src/app');

describe('GET /', () => {
    it('should return 200 status code', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
    });
});

describe('GET /signup', () => {
    it('should return 200 status code', async () => {
        const response = await request(app).get('/signup');
        expect(response.statusCode).toBe(200);
    });
});

describe('GET /privacy', () => {
    it('should return 200 status code', async () => {
        const response = await request(app).get('/privacy');
        expect(response.statusCode).toBe(200);
    });
});

describe('GET /dashboard', () => {
    it('should return 200 status code', async () => {
        const response = await request(app).get('/dashboard');
        expect(response.statusCode).toBe(200);
    });
});

describe('Language switching', () => {
    it('should return 200 when ?lang=zh is passed', async () => {
        const response = await request(app).get('/?lang=zh');
        expect(response.statusCode).toBe(200);
    });
});

describe('404 handler', () => {
    it('should return 404 for unknown routes', async () => {
        const response = await request(app).get('/nonexistent-route');
        expect(response.statusCode).toBe(404);
    });
});
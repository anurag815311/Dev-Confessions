const request = require('supertest');
const app = require('../app');

describe('Dev Confessions API', () => {
  let createdConfessionId;

  describe('POST /api/v1/confessions', () => {
    test('should create a confession successfully', async () => {
      const response = await request(app)
        .post('/api/v1/confessions')
        .send({
          text: 'Testing automated API testing',
          category: 'bug'
        });

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.text).toBe('Testing automated API testing');

      createdConfessionId = response.body.id;
    });

    test('should reject a confession without text', async () => {
      const response = await request(app)
        .post('/api/v1/confessions')
        .send({
          category: 'bug'
        });

      expect(response.statusCode).toBe(400);
      expect(response.body.msg).toBe('need text');
    });

    test('should reject an invalid category', async () => {
      const response = await request(app)
        .post('/api/v1/confessions')
        .send({
          text: 'Testing invalid category',
          category: 'invalid'
        });

      expect(response.statusCode).toBe(400);
    });
  });

  describe('GET /api/v1/confessions', () => {
    test('should return all confessions', async () => {
      const response = await request(app)
        .get('/api/v1/confessions');

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('count');
    });
  });

  describe('GET /api/v1/confessions/:id', () => {
    test('should return the created confession', async () => {
      const response = await request(app)
        .get(`/api/v1/confessions/${createdConfessionId}`);

      expect(response.statusCode).toBe(200);
      expect(response.body.id).toBe(createdConfessionId);
    });

    test('should return 404 for a missing confession', async () => {
      const response = await request(app)
        .get('/api/v1/confessions/99999');

      expect(response.statusCode).toBe(404);
    });
  });

  describe('GET /api/v1/confessions/category/:cat', () => {
    test('should reject an invalid category', async () => {
      const response = await request(app)
        .get('/api/v1/confessions/category/invalid');

      expect(response.statusCode).toBe(400);
    });
  });
});
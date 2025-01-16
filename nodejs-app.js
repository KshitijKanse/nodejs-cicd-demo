// app.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({ message: 'Hello from Node.js Application!' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

module.exports = app;

// test/app.test.js
const request = require('supertest');
const app = require('../app');

describe('API Tests', () => {
  it('should return hello message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Hello from Node.js Application!');
  });

  it('should return health status', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('healthy');
  });
});

// package.json
{
  "name": "nodejs-cicd-demo",
  "version": "1.0.0",
  "description": "Demo Node.js application for CI/CD pipeline",
  "main": "app.js",
  "scripts": {
    "start": "node app.js",
    "test": "jest",
    "test:coverage": "jest --coverage"
  },
  "dependencies": {
    "express": "^4.17.1"
  },
  "devDependencies": {
    "jest": "^27.0.6",
    "supertest": "^6.1.3"
  }
}

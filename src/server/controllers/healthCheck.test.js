import request from 'supertest';
import logger from '../utils/logger';
import serverBuilder from '../server';

describe('Health Check Endpoint', () => {
  let server;

  beforeEach(async () => {
    server = await serverBuilder(logger);
  });

  it('should have status code 200', async () => {
    const res = await request(server).get('/health_check');

    expect(res.statusCode).toEqual(200);
  });

  it('should have status property', async () => {
    const res = await request(server).get('/health_check');

    expect(res.body).toHaveProperty('status');
  });

  it('status property should be OK', async () => {
    const res = await request(server).get('/health_check');

    expect(res.body.status).toEqual('ok');
  });
});

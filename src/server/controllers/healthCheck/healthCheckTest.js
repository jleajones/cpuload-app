import request from 'supertest';
import serverBuilder from '../../server';

describe('/health_check', () => {
  let server;
  beforeEach(async (done) => {
    server = await serverBuilder();
    done();
  });

  afterEach(function () {
    jest.resetModules();
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

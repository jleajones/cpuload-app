import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import healthCheck from './controllers/healthCheck';
import next from 'next';

const isDev = process.env.NODE_ENV !== 'production';
const isTest = process.env.NODE_ENV === 'test';

export default async () => {
  let handle = () => {};
  if (!isTest) {
    const app = next({ dev: isDev });
    handle = app.getRequestHandler();
  }

  const server = express();
  server.use(morgan('common'));
  server.use(bodyParser.json());
  server.get('/health_check', healthCheck);

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  try {
    if (!isTest) {
      await app.prepare();
    }
    return server;
  } catch (e) {}
};

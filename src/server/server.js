import express from 'express';
import http from 'http';
import socketIo from 'socket.io';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import next from 'next';

import { Services } from './controllers';
import healthCheck from './controllers/healthCheck';

const isDev = process.env.NODE_ENV !== 'production';
const isTest = process.env.NODE_ENV === 'test';

const serverBuilder = async (logger) => {
  const server = express();
  const app = next({
    dev: isDev,
    quiet: isTest,
    conf: {
      poweredByHeader: false
    }
  });

  const handle = app.getRequestHandler();

  server.use(morgan('common'));
  server.use(bodyParser.json());
  server.get('/health_check', healthCheck);
  server.get('*', (req, res) => {
    return handle(req, res);
  });

  const httpServer = http.createServer(server);
  const io = socketIo(httpServer);
  io.on('connection', Services.WebSocket.connection);

  try {
    await app.prepare();
    return httpServer;
  } catch (e) {
    logger.error('❌ Houston, we have a problem. Cannot start server!');
  }
};

export default serverBuilder;

// let app;
//
// const isDev = process.env.NODE_ENV !== 'production';
// const isTest = process.env.NODE_ENV === 'test';
//
// const buildServer = () => {
//
// }
//
// export default async (wsPort, wsPath, logger) => {
//   let handle = () => {};
//   let app = {};
//   if (!isTest) {
//     app = next({ dev: isDev });
//     handle = app.getRequestHandler();
//   }
//
//   const server = express();
//   // const wss = WebSocket.Server;
//
//   server.use(morgan('common'));
//   server.use(bodyParser.json());
//   server.get('/health_check', healthCheck);
//
//   server.get('*', (req, res) => {
//     return handle(req, res);
//   });
//
//   try {
//     if (!isTest) {
//       prepareClient();
//     }
//     return {
//       server,
//       wss
//     };
//   } catch (e) {
//     logger.error('❌ Could not prepare the ui.');
//   }
// };

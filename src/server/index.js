import serverBuilder from './server';
import logger from './utils/logger';
import { Services } from './controllers';

const listen = async () => {
  const server = await serverBuilder(logger);
  const port = 3000;

  // wss.on('connection', Services.WebSocket.connection);
  // wss.on('close', Services.WebSocket.close);

  server.on('close', () => {
    logger.info('shutting down...');
  });

  server.listen(port, (err) => {
    if (err) throw err;
    logger.info(`📡 Listening at http://localhost:${port}`);
  });
};

listen().catch((e) => {
  logger.error('Server error: ', { msg: e.message });
});

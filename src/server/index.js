import serverBuilder from './server';
import logger from './utils/logger';
import dotenv from 'dotenv';

dotenv.config()
const listen = async () => {
  const server = await serverBuilder(logger);
  const port = 3000;

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

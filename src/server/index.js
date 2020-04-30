import serverBuilder from './server';
import logger from './utils/logger';

const server = serverBuilder(logger);
const port = 3000;

server.listen(port, (err) => {
  if (err) throw err;
  logger.info(`📡 Listening at http://localhost:${port}`);
});

import logger from '../../../utils/logger';
import os from 'os';

const WEBSOCKET_INTERVAL = 10000;

const sendLoadData = (socket) => {
  const cpus = os.cpus();
  const load = os.loadavg()[0];
  const loadAverage = load / cpus.length;
  const timeStamp = new Date(Date.now()).toUTCString();

  socket.send(
    JSON.stringify({
      cpus,
      load,
      loadAverage,
      timeStamp
    })
  );
};

export default (socket) => {
  logger.info('WebSocket::connection', { id: socket.id });
  sendLoadData(socket);

  setInterval(() => {
    sendLoadData(socket);
  }, WEBSOCKET_INTERVAL);
};

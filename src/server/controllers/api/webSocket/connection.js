import os from 'os';

import logger from '../../../utils/logger';
import {WEBSOCKET_INTERVAL} from "../../../../constants";

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

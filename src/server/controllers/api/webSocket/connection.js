import logger from '../../../utils/logger';
import os from 'os';

export default (socket) => {
  logger.info('WebSocket::connection', { id: socket.id });

  const cpus = os.cpus();
  const load = os.loadavg();
  const loadAverage = load[0] / cpus.length;
  socket.send(
    JSON.stringify({
      cpus,
      load,
      loadAverage
    })
  );

  // send data every 10 secs
  setInterval(() => {
    const cpus = os.cpus();
    const load = os.loadavg();
    const loadAverage = load[0] / cpus.length;
    socket.send(
      JSON.stringify({
        cpus,
        load,
        loadAverage
      })
    );
  }, 10000);
};

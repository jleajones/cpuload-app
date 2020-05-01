import WebSocket from './webSocket'

const API_VERSION = 1;
const API_VERSION_TAG = 'v1.0.0';

const Version = (req, res) => {
  res.json({ version: API_VERSION, tag: API_VERSION_TAG });
};

export default { Version, WebSocket };

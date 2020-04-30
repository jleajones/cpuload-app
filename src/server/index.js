import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

import logger from './utils/logger';

const app = express();
const port = 3000;
// const isDev = process.env.NODE_ENV === 'development'

app.use(morgan('common'));
app.use(bodyParser.json());


app.get('/', (req, res) => res.send('Hello World and it auto reloads 😁'));
app.get('/health_check', (req, res) => {
    res.send('I am happy and healthy\n');
});

app.listen(port, () => logger.info(`📡 Listening at http://localhost:${port}`));

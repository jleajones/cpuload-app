import { Router } from 'express';
import { Services } from '../controllers';

const API = Router();

API.get('/', Services.version);

export default API;

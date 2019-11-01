import express from 'express';
import image from './image';
import temp from './temp';

const api = express.Router();
api.use('/temp', temp);
api.use('/image', image);

export default api;
import express from 'express';
import likeController from '../controller/likeController.js';

const likeRoute = express.Router();
likeRoute.post('like/create', likeController.create);
likeRoute.delete('like/delete', likeController.delete);
likeRoute.get('like/', likeController.getAll);


export default likeRoute;

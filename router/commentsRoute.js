import express from 'express';
import commentsController from '../controller/commentController.js';

const commentRoute = express.Router();
//création des routes
commentRoute.post('comment/create', commentsController.create)
commentRoute.put('comment/update', commentsController.update);
commentRoute.delete('comment/delete', commentsController.delete);
commentRoute.get('comment/:id', commentsController.getId);
commentRoute.get('comment/', commentsController.getAll);

export default commentRoute;
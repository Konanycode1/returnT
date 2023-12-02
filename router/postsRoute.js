import postController from '../controller/postController.js';
import express from 'express';

const postRoute = express.Router();

postRoute.post('posts/create', postController.create);
postRoute.put('posts/update',postController.update);
postRoute.delete('posts/delete', postController.delete);
postRoute.get('posts/:id', postController.getId);
postRoute.get('posts/', postController.getAll);

export default postRoute;
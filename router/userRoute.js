import express from 'express';
import userController from '../controller/userController.js';

const userRoute = express.Router();

userRoute.post('user/create',userController.create);
userRoute.post('user/login', userController.login);
userRoute.put('user/update/:id',userController.update);
userRoute.delete('user/delete/:id',userController.delete);
userRoute.get('user/:id',userController.getId);
userRoute.get('user/', userController.getAll);

export default userRoute;

import 'module-alias/register';
import { Router } from 'express';
import * as userValidator from '@/validators/user';
import * as userController from '@/controllers/user';

const userRouter = Router();

userRouter.get('/', userValidator.findUser, userController.findUser);

export default userRouter;

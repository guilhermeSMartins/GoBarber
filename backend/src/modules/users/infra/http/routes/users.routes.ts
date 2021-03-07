import { Router } from 'express';
import UsersRepository from '../../typeorm/repositories/UsersRepository';
import UsersController from '../controllers/UsersController';

const usersRouter = Router();

const usersController = new UsersController();

usersRouter.post('/', async (req, res) => usersController.create);

export default usersRouter;
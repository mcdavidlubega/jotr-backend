import { Router } from 'express';
import users from './users';
import auth from './auth';

const routers = Router();

routers.use('/users', users);
routers.use('/auth', auth);

export default routers;

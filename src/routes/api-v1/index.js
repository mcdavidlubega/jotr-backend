import { Router } from 'express';
import users from './users';

const routers = Router();

routers.use('/users', users);

export default routers;

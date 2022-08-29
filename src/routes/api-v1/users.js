import { Router } from 'express';
import usersController from '../../controllers/userController';
import asyncMiddleware from '../../middleware/async';

const router = Router();

router.post('/', asyncMiddleware(usersController.registerUsers));

export default router;

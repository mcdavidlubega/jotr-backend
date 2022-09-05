import { Router } from 'express';
import { Joi, Segments, celebrate } from 'celebrate';
import usersController from '../../controllers/users';
import asyncMiddleware from '../../middleware/async';

const router = Router();

router.post(
  '/register',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      userName: Joi.string().min(5).max(50).required(),
      email: Joi.string().max(50).email().required(),
      password: Joi.string().max(1024).required(),
      firstName: Joi.string().min(2).max(50),
      lastName: Joi.string().min(2).max(50),
    }),
  }),
  asyncMiddleware(usersController.registerUsers)
);

export default router;

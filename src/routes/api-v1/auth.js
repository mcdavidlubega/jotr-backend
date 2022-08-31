import { Router } from 'express';
import { Joi, Segments, celebrate } from 'celebrate';
import authController from '../../controllers/auth';
import asyncMiddleware from '../../middleware/async';

const router = Router();

router.post(
  '/login',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  asyncMiddleware(authController.loginUser)
);

export default router;

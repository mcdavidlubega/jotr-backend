import { Router } from 'express';
import { Joi, Segments, celebrate } from 'celebrate';
import verify from '../../middleware/verifyToken';
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

router.get(
  '/profile/:username',
  asyncMiddleware(usersController.getuserProfile)
);

router.patch(
  '/profile/:username',
  verify,
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      userName: Joi.string().min(5).max(50),
      email: Joi.string().max(50).email(),
      firstName: Joi.string().max(50),
      lastName: Joi.string().max(50),
      socialMedia: Joi.array().items(Joi.string().min(3).max(256)),
      tel: Joi.string().min(4),
      bio: Joi.string().min(1).max(5000),
      website: Joi.string().min(3).max(256),
    }),
  }),
  usersController.updateUserProfile
);
export default router;

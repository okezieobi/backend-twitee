import { Router } from 'express';

import userRoutes from './user';
import twitRoutes from './twit';
import middleware from '../middleware';
import validations from '../validations';
import controllers from '../controllers';
import jwt from '../utils/jwt';

const router = Router();

const handleResponse = (req, res) => {
  if (res.locals.data.user) {
    res.locals.data.token = jwt.generate(res.locals.data.user);
    res.status(res.locals.data.status).set('token', res.locals.data.token).send({ data: res.locals.data });
  } else {
    res.status(res.locals.data.status).send({ data: res.locals.data });
  }
};

router.use('/auth', userRoutes({
  Router,
  handleResponse,
  validations,
  controllers,
}));
router.use([...[validations.user.jwt], middleware.user.findById]);
router.use('/twits', twitRoutes({
  Router, handleResponse, controllers, validations, middleware,
}));

export default router;

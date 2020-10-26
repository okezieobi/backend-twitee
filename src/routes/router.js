import { Router } from 'express';

import userRoutes from './user';
import twitRoutes from './twit';
import middleware from '../middleware';
import validations from '../validations';

const router = Router();

router.use('/auth', userRoutes(Router));
router.use([...[validations.user.jwt], middleware.user.findById]);
router.use('/twits', twitRoutes(Router));

export default router;

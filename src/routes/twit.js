import controllers from '../controllers';
import validations from '../validations';
import middleware from '../middleware';
import commentRoutes from './comment';

export default (Router) => {
  const handleResponse = (req, res) => {
    res.status(res.locals.data.status).send({ data: res.locals.data });
  };

  const router = Router();

  router.get('/all', controllers.twit.findAll, handleResponse);

  router.route('/')
    .post([...[validations.twit.create], controllers.twit.createOne], handleResponse)
    .get(controllers.twit.findAllByOwner, handleResponse);

  router.use('/:id', [...[validations.twit.id], middleware.twit.findOneById]);
  router.route('/:id')
    .get(handleResponse);

  router.use('/:id/comments', commentRoutes(Router));

  return router;
};

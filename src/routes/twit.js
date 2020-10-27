import controllers from '../controllers';
import validations from '../validations';
import middleware from '../middleware';

export default (Router) => {
  const handleResponse = (req, res) => {
    res.status(res.locals.data.status).send({ data: res.locals.data });
  };

  const router = Router();

  router.route('/')
    .post([...[validations.twit.create], controllers.twit.createOne], handleResponse)
    .get([controllers.twit.findAll], handleResponse);

  router.use('/:id', [...[validations.twit.id], middleware.twit.findOneById]);
  router.route('/:id')
    .get(handleResponse);

  return router;
};

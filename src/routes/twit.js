import commentRoutes from './comment';

export default ({
  Router, handleResponse, controllers,
  validations, middleware,
}) => {
  const router = Router();

  router.get('/all', controllers.twit.findAll, handleResponse);

  router.route('/')
    .post([...[validations.twit.create], controllers.twit.createOne], handleResponse)
    .get(controllers.twit.findAllByOwner, handleResponse);

  router.use('/:id', [...[validations.twit.id], middleware.twit.findOneById]);
  router.route('/:id')
    .get(handleResponse);

  router.use('/:id/comments', commentRoutes({
    Router, handleResponse, validations, controllers,
  }));

  return router;
};

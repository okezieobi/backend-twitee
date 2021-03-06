import commentRoutes from './comment';

export default (Router, handleResponse, {
  twit: {
    findAll, createOne, findAllByOwner, verifyOne, deleteOneByOwner,
  }, comment,
}) => {
  const router = Router();

  router.get('/all', findAll, handleResponse);

  router.route('/')
    .post(createOne, handleResponse)
    .get(findAllByOwner, handleResponse);

  router.use('/:id', verifyOne);
  router.route('/:id')
    .get(handleResponse)
    .delete(deleteOneByOwner, handleResponse);

  router.use('/:id/comments', commentRoutes(Router, handleResponse, comment));

  return router;
};

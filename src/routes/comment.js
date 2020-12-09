export default (Router, handleResponse, { createOne, findAll }) => {
  const router = Router();

  router.route('/')
    .post(createOne, handleResponse)
    .get(findAll, handleResponse);

  return router;
};

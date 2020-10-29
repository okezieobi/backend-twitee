export default ({
  Router, handleResponse, validations, controllers,
}) => {
  const router = Router();

  router.route('/')
    .post([...[validations.comment.create], controllers.comment.createOne], handleResponse)
    .get(controllers.comment.findAll, handleResponse);

  return router;
};

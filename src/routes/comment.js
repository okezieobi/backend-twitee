import controllers from '../controllers';

export default (Router) => {
  const handleResponse = (req, res) => {
    res.status(res.locals.data.status).send({ data: res.locals.data });
  };
  const router = Router();

  router.route('/')
    .post(controllers.comment.createOne, handleResponse)
    .get(controllers.comment.findAll, handleResponse);

  return router;
};

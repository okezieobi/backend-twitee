import controllers from '../controllers';
import validations from '../validations';

export default (Router) => {
  const handleResponse = (req, res) => {
    res.status(res.locals.data.status).send({ data: res.locals.data });
  };
  const router = Router();

  router.route('/')
    .post([...[validations.comment.create], controllers.comment.createOne], handleResponse)
    .get(controllers.comment.findAll, handleResponse);

  return router;
};

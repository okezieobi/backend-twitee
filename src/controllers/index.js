import services from '../services';
import UserController from './user';
import TwitController from './twit';
import CommentController from './comment';
import jwt from '../utils/jwt';

const handleServiceOutput = (data, { locals }, next) => {
  if (data.message) throw data;
  else {
    const resLocal = locals;
    resLocal.data = data;
    next();
  }
};

const user = new UserController(services, handleServiceOutput, jwt);
const twit = new TwitController(services, handleServiceOutput);
const comment = new CommentController(services, handleServiceOutput);

export default {
  user, twit, comment,
};

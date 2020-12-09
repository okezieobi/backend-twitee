import services from '../services';
import UserController from './user';
import TwitController from './twit';
import CommentController from './comment';
import jwt from '../utils/jwt';

const user = new UserController(services, jwt);
const twit = new TwitController(services);
const comment = new CommentController(services);

export default {
  user, twit, comment,
};

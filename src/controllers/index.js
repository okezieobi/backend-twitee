import services from '../services';
import UserController from './user';
import TwitController from './twit';
import CommentController from './comment';

const user = new UserController(services);
const twit = new TwitController(services);
const comment = new CommentController(services);

export default {
  user, twit, comment,
};

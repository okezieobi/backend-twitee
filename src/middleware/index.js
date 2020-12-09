import controllers from '../controllers';
import validations from '../validations';
import UserMiddleware from './user';
import TwitMiddleware from './twit';
import CommentMiddleware from './comment';

const user = new UserMiddleware(validations, controllers);
const twit = new TwitMiddleware(validations, controllers);
const comment = new CommentMiddleware(validations, controllers);

export default {
  user, twit, comment,
};

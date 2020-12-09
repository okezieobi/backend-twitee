import controllers from '../controllers';
import validations from '../validations';
import UserMiddleware from './user';
import TwitMiddleware from './twit';

const user = new UserMiddleware(validations, controllers);
const twit = new TwitMiddleware(validations, controllers);

export default {
  user, twit,
};

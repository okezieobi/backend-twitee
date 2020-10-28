import services from '../services';
import UserMiddleware from './user';
import TwitMiddleware from './twit';

const user = new UserMiddleware(services);
const twit = new TwitMiddleware(services);

export default {
  user, twit,
};

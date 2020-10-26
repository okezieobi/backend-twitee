import services from '../services';
import UserController from './user';
import TwitController from './twit';

const user = new UserController(services);
const twit = new TwitController(services);

export default {
  user, twit,
};

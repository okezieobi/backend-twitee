import models from '../models';
import UserServices from './user';
import TwitServices from './twit';

const user = new UserServices(models);
const twit = new TwitServices(models);

export default {
  user, twit,
};

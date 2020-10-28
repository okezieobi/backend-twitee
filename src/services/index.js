import models from '../models';
import UserServices from './user';
import TwitServices from './twit';
import CommentServices from './comment';

const user = new UserServices(models);
const twit = new TwitServices(models);
const comment = new CommentServices(models);

export default {
  user, twit, comment,
};

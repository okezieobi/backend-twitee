/* eslint-disable no-console */
import { Sequelize, DataTypes } from 'sequelize';

import UserModel from './user';
import TwitModel from './twit';
import CommentModel from './comment';
import env from '../utils/env';

const sequelize = new Sequelize(env.databaseURL, { ssl: true, dialect: 'postgres', logging: false });
// pass your sequelize config here

// models are ordered in cascading order
const models = { user: UserModel, twit: TwitModel, comment: CommentModel };

Object.values(models).forEach((model) => model.init(sequelize, DataTypes));

// Run `.associate` if it exists,
// ie create relationships in the ORM
Object.values(models)
  .filter((model) => typeof model.associate === 'function')
  .forEach((model) => model.associate(models));

(async () => {
  if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'production') {
    await sequelize.authenticate();
  } else {
    await sequelize.authenticate().then(() => console.log('Database connection successful'));
    await sequelize.sync({ force: true, match: /dev$/ });
  }
  // no sequelize.sync(); use umzug migrations after writing models
})();

export default {
  ...models,
  sequelize,
  Sequelize,
};

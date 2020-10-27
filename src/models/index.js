import { Sequelize } from 'sequelize';

import UserModel from './user';
import TwitModel from './twit';
import env from '../utils/env';

const sequelize = new Sequelize(env.databaseURL, { ssl: true, dialect: 'postgres', logging: false });
// pass your sequelize config here

const models = { user: UserModel, twit: TwitModel };

Object.values(models).forEach((model) => model.init(sequelize));

// Run `.associate` if it exists,
// ie create relationships in the ORM
Object.values(models)
  .filter((model) => typeof model.associate === 'function')
  .forEach((model) => model.associate(models));

(async () => {
  await sequelize.authenticate();
  /*
  if (process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'production') {
    await sequelize.sync({ force: true, match: /dev$/ });
  }
  */
  // no sequelize.sync() here, use migrations after writing models for tests and production
  await sequelize.sync({ alter: true });
})();

export default {
  ...models,
  sequelize,
};

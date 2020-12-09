export default class User {
  constructor({ user, sequelize }) {
    this.model = user;
    this.sequelize = sequelize;
  }

  async create(arg) {
    return this.sequelize.transaction(async (t) => {
      let data;
      const userExists = await this.model.findOne({
        where: {
          email: arg.email,
        },
        transaction: t,
      });
      if (userExists) data = { message: 'User already exists with provided email, please sign in or use another email', status: 406 };
      else {
        await this.model.create(arg, { transaction: t });
        const user = await this.model.findOne({
          where: {
            email: arg.email,
          },
          transaction: t,
          attributes: {
            exclude: ['password', 'updatedAt'],
          },
        });
        data = { user, status: 201 };
      }
      return data;
    });
  }

  async auth(arg) {
    return this.sequelize.transaction(async (t) => {
      let data;
      const userExists = await this.model.findOne({
        where: {
          email: arg.email,
        },
        transaction: t,
      });
      if (userExists) {
        const verifyPassword = await this.model.verifyPassword(arg.password, userExists.password);
        if (verifyPassword) {
          const user = await this.model.findOne({
            where: {
              email: arg.email,
            },
            transaction: t,
            attributes: {
              exclude: ['password'],
            },
          });
          data = { user, status: 200 };
        } else data = { message: 'Password provided does not match user', status: 401 };
      } else data = { message: 'User not found, please sign up by creating an account', status: 404 };
      return data;
    });
  }

  async authJWT(arg) {
    return this.sequelize.transaction(async (t) => {
      let data;
      const user = await this.model.findByPk(arg, {
        transaction: t,
        attributes: {
          exclude: ['password'],
        },
      });
      if (user) data = { user, status: 200 };
      else data = { message: 'User not found, please sign up by creating an account', status: 401 };
      return data;
    });
  }
}

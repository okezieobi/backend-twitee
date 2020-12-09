export default class Twit {
  constructor({
    twit, user, sequelize, Sequelize,
  }) {
    this.model = twit;
    this.sequelize = sequelize;
    this.userModel = user;
    this.Sequelize = Sequelize;
  }

  async create({ content, UserId }) {
    return this.sequelize.transaction(async (t) => {
      const twit = await this.model.create({
        content,
        UserId,
      }, {
        transaction: t,
      });
      return { twit, status: 201 };
    });
  }

  async findEvery() {
    return this.sequelize.transaction(async (t) => {
      const twits = await this.model.findAndCountAll({
        include: { model: this.userModel, attributes: ['name', 'email'] },
        offset: 0,
        limit: 50,
        transaction: t,
        attributes: {
          exclude: ['UserId'],
        },
      });
      return { twits, status: 200 };
    });
  }

  async findByOwner({ UserId }) {
    return this.sequelize.transaction(async (t) => {
      const twits = await this.model.findAndCountAll({
        where: {
          UserId,
        },
        offset: 0,
        limit: 50,
        transaction: t,
      });
      return { twits, status: 200 };
    });
  }

  async findOneByOwner({ UserId, id }) {
    return this.sequelize.transaction(async (t) => {
      let data;
      const twit = await this.model.findOne({
        where: {
          [this.Sequelize.Op.and]: [
            { UserId }, { id },
          ],
        },
        transaction: t,
      });
      if (twit) data = { twit, status: 200 };
      else data = { message: 'Twit not found', status: 404 };
      return data;
    });
  }
}

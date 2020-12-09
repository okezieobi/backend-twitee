export default class Comment {
  constructor({ comment, user, sequelize }) {
    this.model = comment;
    this.sequelize = sequelize;
    this.userModel = user;
  }

  async create({ content, UserId, TwitId }) {
    return this.sequelize.transaction(async (t) => {
      const comment = await this.model.create({
        content,
        UserId,
        TwitId,
      }, {
        transaction: t,
      });
      return { comment, status: 201 };
    });
  }

  async findByTwit(TwitId) {
    return this.sequelize.transaction(async (t) => {
      const comments = await this.model.findAndCountAll({
        include: { model: this.userModel, attributes: ['name', 'email'] },
        where: {
          TwitId,
        },
        offset: 0,
        limit: 50,
        transaction: t,
        attributes: {
          exclude: ['UserId', 'TwitId'],
        },
      });
      return { comments, status: 200 };
    });
  }
}

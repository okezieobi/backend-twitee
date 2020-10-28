export default class Comment {
  constructor(models) {
    this.models = models;
  }

  async create(arg) {
    return this.models.sequelize.transaction(async (t) => {
      const comment = await this.models.comment.createOne(arg, t);
      return { comment, status: 201 };
    });
  }

  async findByTwit(arg) {
    return this.models.sequelize.transaction(async (t) => {
      const comments = await this.models.comment.findByTwit(arg, t);
      return { comments, status: 200 };
    });
  }
}

export default class Comment {
  constructor({ comment }, handleServiceOutput) {
    this.services = comment;
    this.createOne = this.createOne.bind(this);
    this.findAll = this.findAll.bind(this);
    this.handleServiceOutput = handleServiceOutput;
  }

  async createOne({ body: { content } }, res, next) {
    await this.services.create({
      content,
      UserId: res.locals.userId,
      TwitId: res.locals.data.twit.id,
    }).then((data) => this.handleServiceOutput(data, res, next)).catch(next);
  }

  async findAll(req, res, next) {
    await this.services.findByTwit(res.locals.data.twit.id)
      .then((data) => this.handleServiceOutput(data, res, next)).catch(next);
  }
}

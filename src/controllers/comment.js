export default class Comment {
  constructor(services) {
    this.services = services.comment;
    this.createOne = this.createOne.bind(this);
    this.findAll = this.findAll.bind(this);
  }

  async createOne({ body: { content } }, res, next) {
    await this.services.create({
      content,
      UserId: res.locals.userId,
      TwitId: res.locals.data.twit.id,
    }).then((data) => {
      if (data.message) throw data;
      else {
        res.locals.data = data;
        next();
      }
    }).catch(next);
  }

  async findAll(req, res, next) {
    await this.services.findByTwit(res.locals.data.twit.id)
      .then((data) => {
        res.locals.data = data;
        next();
      }).catch(next);
  }
}

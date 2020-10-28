export default class CommentController {
  constructor(services) {
    this.services = services.comment;
    this.createOne = this.createOne.bind(this);
    this.findAll = this.findAll.bind(this);
  }

  async createOne({ body: { content } }, res, next) {
    try {
      const data = await this.services.create({
        content,
        UserId: res.locals.userId,
        TwitId: res.locals.data.twit.id,
      });
      if (data.message) next(data);
      else {
        res.locals.data = data;
        next();
      }
    } catch (err) {
      next(err);
    }
  }

  async findAll(req, res, next) {
    try {
      res.locals.data = await this.services.findByTwit(res.locals.data.twit.id);
      next();
    } catch (err) {
      next(err);
    }
  }
}

export default class EntryController {
  constructor(services) {
    this.services = services.twit;
    this.createOne = this.createOne.bind(this);
    this.findAll = this.findAll.bind(this);
  }

  async createOne({ body: { content } }, res, next) {
    try {
      const data = await this.services.create({ content, id: res.locals.userId });
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
      const data = await this.services.findByOwner(res.locals.userId);
      res.locals.data = data;
      next();
    } catch (err) {
      next(err);
    }
  }
}

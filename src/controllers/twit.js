export default class Twit {
  constructor(services) {
    this.services = services.twit;
    this.createOne = this.createOne.bind(this);
    this.findAllByOwner = this.findAllByOwner.bind(this);
    this.findAll = this.findAll.bind(this);
  }

  async createOne({ body: { content } }, res, next) {
    await this.services.create({ content, id: res.locals.userId })
      .then((data) => {
        if (data.message) throw data;
        else {
          res.locals.data = data;
          next();
        }
      }).catch(next);
  }

  async findAllByOwner(req, res, next) {
    await this.services.findByOwner(res.locals.userId)
      .then((data) => {
        res.locals.data = data;
        next();
      }).catch(next);
  }

  async findAll(req, res, next) {
    await this.services.findEvery().then((data) => {
      res.locals.data = data;
      next();
    }).catch(next);
  }
}

export default class Twit {
  constructor({ twit }, handleServiceOutput) {
    this.services = twit;
    this.createOne = this.createOne.bind(this);
    this.findAllByOwner = this.findAllByOwner.bind(this);
    this.findAll = this.findAll.bind(this);
    this.findOneById = this.findOneById.bind(this);
    this.deleteOneByOwner = this.deleteOneByOwner.bind(this);
    this.handleServiceOutput = handleServiceOutput;
  }

  async createOne({ body: { content } }, res, next) {
    await this.services.create({ content, UserId: res.locals.userId })
      .then((data) => this.handleServiceOutput(data, res, next)).catch(next);
  }

  async findAllByOwner(req, res, next) {
    await this.services.findByOwner({ UserId: res.locals.userId })
      .then((data) => this.handleServiceOutput(data, res, next)).catch(next);
  }

  async findAll(req, res, next) {
    await this.services.findEvery()
      .then((data) => this.handleServiceOutput(data, res, next)).catch(next);
  }

  async findOneById({ params: { id } }, res, next) {
    await this.services.findOneByOwner({ UserId: res.locals.userId, id })
      .then((data) => this.handleServiceOutput(data, res, next)).catch(next);
  }

  async deleteOneByOwner({ params: { id } }, res, next) {
    await this.services.deleteOneByOwner({ UserId: res.locals.userId, id })
      .then((data) => this.handleServiceOutput(data, res, next)).catch(next);
  }
}

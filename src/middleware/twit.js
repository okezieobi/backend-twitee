export default class Twit {
  constructor(services) {
    this.services = services;
    this.findOneById = this.findOneById.bind(this);
  }

  async findOneById({ params: { id } }, res, next) {
    await this.services.twit.findOneByOwner({ UserId: res.locals.userId, id })
      .then((data) => {
        if (data.message) throw data;
        else {
          res.locals.data = data;
          next();
        }
      }).catch(next);
  }
}

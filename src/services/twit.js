export default class EntryServices {
  constructor(models) {
    this.models = models;
  }

  async create(arg) {
    return this.models.sequelize.transaction(async (t) => {
      const twit = await this.models.twit.createOne(arg, t);
      return { twit, status: 201 };
    });
  }

  async findEvery() {
    return this.models.sequelize.transaction(async (t) => {
      const twits = await this.models.twit.findEvery(t);
      return { twits, status: 200 };
    });
  }

  async findByOwner(arg) {
    return this.models.sequelize.transaction(async (t) => {
      const twits = await this.models.twit.findAllByOwnerId(arg, t);
      return { twits, status: 200 };
    });
  }

  async findOneByOwner(arg) {
    return this.models.sequelize.transaction(async (t) => {
      let data;
      const twit = await this.models.twit.findOneByOwnerId(arg, t);
      if (twit) data = { twit, status: 200 };
      else data = { message: 'Twit not found', status: 404 };
      return data;
    });
  }
}

import jwt from '../utils/jwt';

export default class User {
  constructor(services) {
    this.services = services.user;
    this.findById = this.findById.bind(this);
  }

  async findById({ headers }, res, next) {
    try {
      const { id } = jwt.verify(headers);
      await this.services.authJWT(id).then((data) => {
        if (data.message) throw data;
        else {
          res.locals.userId = id;
          next();
        }
      });
    } catch (err) {
      next(err);
    }
  }
}

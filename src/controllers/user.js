export default class User {
  constructor({ user }, jwt) {
    this.services = user;
    this.jwt = jwt;
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.findById = this.findById.bind(this);
    this.setJWT = this.setJWT.bind(this);
    this.verifyJWT = this.verifyJWT.bind(this);
  }

  async signup({ body }, res, next) {
    await this.services.create(body).then((data) => {
      if (data.message) throw data;
      else {
        res.locals.data = data;
        next();
      }
    }).catch(next);
  }

  async login({ body }, res, next) {
    await this.services.auth(body).then((data) => {
      if (data.message) throw data;
      else {
        res.locals.data = data;
        next();
      }
    }).catch(next);
  }

  async findById(req, res, next) {
    await this.services.authJWT(res.locals.userId).then((data) => {
      if (data.message) throw data;
      else next();
    }).catch(next);
  }

  async setJWT(req, res, next) {
    res.locals.data.token = await this.jwt.generate(res.locals.data.user);
    res.set('token', res.locals.data.token);
    next();
  }

  async verifyJWT({ headers }, res, next) {
    await this.jwt.verify(headers)
      .then(({ id }) => {
        res.locals.userId = id;
        next();
      }).catch(next);
  }
}

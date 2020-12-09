export default class Twit {
  constructor(validations, controllers) {
    this.findAll = controllers.twit.findAll;
    this.createOne = [...validations.twit.create, controllers.twit.createOne];
    this.findAllByOwner = controllers.twit.findAllByOwner;
    this.verifyOne = [...validations.twit.id, controllers.twit.findOneById];
    this.deleteOneByOwner = controllers.twit.deleteOneByOwner;
  }
}

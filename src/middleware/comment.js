export default class Comment {
  constructor(validations, controllers) {
    this.findAll = controllers.comment.findAll;
    this.createOne = [...validations.comment.create, controllers.comment.createOne];
  }
}

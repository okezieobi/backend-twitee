export default class Comment {
  constructor(checkSchema) {
    this.validateInput = checkSchema({
      content: {
        in: ['body'],
        isLength: {
          errorMessage: 'Comment content should be at least 1 character long',
          options: { min: 1 },
        },
        isString: {
          errorMessage: 'Comment content must be string data type',
        },
        exists: {
          errorMessage: 'Comment content is required',
          options: { checkFalsy: true },
        },
      },
    });
  }
}

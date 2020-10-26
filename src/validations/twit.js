export default class TwitSchema {
  constructor(checkSchema) {
    this.validateInput = checkSchema({
      content: {
        in: ['body'],
        isLength: {
          errorMessage: 'Entry body should be at least 1 character long',
          options: { min: 1 },
        },
        isString: {
          errorMessage: 'Entry body must be string data type',
        },
        exists: {
          errorMessage: 'Entry body is required',
          options: { checkFalsy: true },
        },
      },
    });

    this.validateEntryId = checkSchema({
      id: {
        in: ['params'],
        isUUID: {
          errorMessage: 'Entry id does not match UUID format',
        },
      },
    });
  }
}

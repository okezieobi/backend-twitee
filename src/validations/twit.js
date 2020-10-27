export default class TwitSchema {
  constructor(checkSchema) {
    this.validateInput = checkSchema({
      content: {
        in: ['body'],
        isLength: {
          errorMessage: 'Twit body should be at least 1 character long',
          options: { min: 1 },
        },
        isString: {
          errorMessage: 'Twit body must be string data type',
        },
        exists: {
          errorMessage: 'Twit body is required',
          options: { checkFalsy: true },
        },
      },
    });

    this.validateEntryId = checkSchema({
      id: {
        in: ['params'],
        isUUID: {
          errorMessage: 'Twit id does not match UUID format',
        },
      },
    });
  }
}

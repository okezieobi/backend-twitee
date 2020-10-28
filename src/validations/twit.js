export default class Twit {
  constructor(checkSchema) {
    this.validateInput = checkSchema({
      content: {
        in: ['body'],
        isLength: {
          errorMessage: 'Twit content should be at least 1 character long',
          options: { min: 1 },
        },
        isString: {
          errorMessage: 'Twit content must be string data type',
        },
        exists: {
          errorMessage: 'Twit content is required',
          options: { checkFalsy: true },
        },
      },
    });

    this.validateTwitId = checkSchema({
      id: {
        in: ['params'],
        isUUID: {
          errorMessage: 'Twit id does not match UUID format',
        },
      },
    });
  }
}

export default class User {
  constructor(checkSchema) {
    this.validateLogin = checkSchema({
      email: {
        in: ['body'],
        isLength: {
          errorMessage: 'Email should be at most 256 characters long',
          options: { min: 1, max: 256 },
        },
        isString: {
          errorMessage: 'Email must be string data type',
        },
        exists: {
          errorMessage: 'Email is required',
          options: { checkFalsy: true },
        },
      },
      password: {
        in: ['body'],
        isLength: {
          errorMessage: 'Password should be at least 1 character long',
          options: { min: 1 },
        },
        isString: {
          errorMessage: 'Password must be string data type',
        },
        exists: {
          errorMessage: 'Password is required',
          options: { checkFalsy: true },
        },
      },
    });

    this.validateSignup = checkSchema({
      name: {
        in: ['body'],
        isLength: {
          errorMessage: 'Full name should be at most 256 characters long',
          options: { min: 1, max: 256 },
        },
        isString: {
          errorMessage: 'Full name must be string data type',
        },
        exists: {
          errorMessage: 'Full name is required',
          options: { checkFalsy: true },
        },
      },
      email: {
        in: ['body'],
        isLength: {
          errorMessage: 'Email should be at most 256 characters long',
          options: { min: 1, max: 256 },
        },
        isString: {
          errorMessage: 'Email must be string data type',
        },
        exists: {
          errorMessage: 'Email is required',
          options: { checkFalsy: true },
        },
        isEmail: {
          errorMessage: 'Email format is wrong',
        },
      },
      password: {
        in: ['body'],
        isLength: {
          errorMessage: 'Password should be at least 1 character long',
          options: { min: 1, max: 256 },
        },
        isString: {
          errorMessage: 'Password must be string data type',
        },
        exists: {
          errorMessage: 'Password is required',
          options: { checkFalsy: true },
        },
      },
    });

    this.validateJWT = checkSchema({
      token: {
        in: ['headers'],
        isString: {
          errorMessage: 'Token must be string data type',
        },
        exists: {
          errorMessage: 'Token is required',
          options: { checkFalsy: true },
        },
        isJWT: {
          errorMessage: 'Token does not match Json Web Token format',
        },
      },
    });
  }
}

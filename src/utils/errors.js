class GeneralError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }

  getCode() {
    if (this instanceof NotFound) {
      return 404;
    }
    if (this instanceof Unauthorized) {
      return 401;
    }
    if (this instanceof BadRequest) {
      return 400;
    }
    return 500;
  }

  getUserFriendlyMessage() {
    if (this instanceof NotFound) {
      return "I didn't found what you requested.";
    }
    if (this instanceof Unauthorized) {
      return 'You are Unautorized.';
    }
    if (this instanceof BadRequest) {
      return "I can't process your request.";
    }
    return 'I will not answer your request ';
  }
}

class NotFound extends GeneralError {}
class BadRequest extends GeneralError {}
class Unauthorized extends GeneralError {}

module.exports = {
  GeneralError,
  NotFound,
  BadRequest,
  Unauthorized,
};

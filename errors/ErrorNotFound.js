const { CODE_404 } = require('../configs/response');
// Ошибка несуществующей страницы: 404 с котиком
class ErrorNotFound extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CODE_404;
  }
}
module.exports = ErrorNotFound;

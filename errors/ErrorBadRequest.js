const { CODE_400 } = require('../configs/response');
// Ошибка некорректных данных: поля пользователя/ карточки
class ErrorBadRequest extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CODE_400;
  }
}

module.exports = ErrorBadRequest;

const { CODE_409 } = require('../configs/response');
// Ошибка введенных данных: конфликт запроса и сущестующих на сервере данных
class ErrorConflict extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CODE_409;
  }
}
module.exports = ErrorConflict;

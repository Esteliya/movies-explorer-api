const { CODE_403 } = require('../configs/response');
//  Ошибка: доступ к запрошенному ресурсу запрещен
class ErrorForbidden extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CODE_403;
  }
}

module.exports = ErrorForbidden;

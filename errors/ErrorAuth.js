const { CODE_401 } = require('../configs/response');
// Ошибка авторизации. Передача неверных данных:email, password, token(jwt)
class ErrorAuth extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CODE_401;
  }
}
module.exports = ErrorAuth;

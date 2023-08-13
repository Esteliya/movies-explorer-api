const { CODE_500, ERR_HOST } = require('../configs/response');

const errorHandler = (err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = CODE_500, message } = err;
  res.status(statusCode).send({
    // проверяем статус и выставляем сообщение в зависимости от него
    message: statusCode === 500
      ? ERR_HOST
      : message,
  });
  next();
};

module.exports = errorHandler;

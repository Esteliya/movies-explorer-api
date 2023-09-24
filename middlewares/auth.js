const jwt = require('jsonwebtoken');
const ErrorAuth = require('../errors/ErrorAuth');// 401
const { ERR_REQ_AUTH } = require('../configs/response');

// достаем секретный ключ в отдельной env переменной, либо альтернативный, если нет .env
const { JWT_SECRET = 'development-secret' } = process.env;

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    // секретный ключ — перенесли в .env
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new ErrorAuth(ERR_REQ_AUTH));
  }
  req.user = payload;
  next();
};

module.exports = {
  auth,
};

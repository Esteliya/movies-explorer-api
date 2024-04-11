const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
// ошибки
const ErrorBadRequest = require('../errors/ErrorBadRequest');// 400
const ErrorAuth = require('../errors/ErrorAuth');// 401
const ErrorConflict = require('../errors/ErrorConflict');// 409
// константы сообщений ответов
const {
  BAD_REQUEST,
  ERR_AUTH,
  ERR_AUTH_TOTAL,
  ERR_CONFLICT,
} = require('../configs/response');

// достаем секретный ключ в отдельной env переменной, либо альтернативный, если нет .env
const { JWT_SECRET = 'development-secret' } = process.env;

// регистрация пользователя
const createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
  } = req.body;
  // хэшируем пароль
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new ErrorBadRequest(BAD_REQUEST));
      } else if (err.code === 11000) {
        next(new ErrorConflict(ERR_CONFLICT));
      } else {
        next(err);
      }
    });
};

// авторизация пользователя
const login = (req, res, next) => {
  const {
    email,
    password,
  } = req.body;
  // console.log(JWT_SECRET);
  User.findOne({ email })
    .orFail(() => next(new ErrorAuth(ERR_AUTH)))
    // если email существует в базе —> пользователь в переменной user
    .then((user) => {
      // проверяем пароль
      bcrypt.compare(password, user.password)
        .then((isValidUser) => {
          if (isValidUser) {
            // если валидный пароль —> создадим jwt токен на 7 дней
            const token = jwt.sign(
              { _id: user._id },
              // секретный ключ — перенесли в .env
              JWT_SECRET,
              // токен на 7 дней
              { expiresIn: '7d' },
            );
            // записываем токен в httpOnly кук —> отправляем на фронт пользователя
            res.status(200).cookie('jwt', token, {
              maxAge: 3600000 * 24 * 7,
              sameSite: 'None',
              secure: true,
              httpOnly: true,
            }).send(user);
            // console.log(token);
          } else {
            next(new ErrorAuth(ERR_AUTH_TOTAL));
          }
        });
    })
    .catch(next);
};

// выход из аккаунта
const getSignout = (req, res, next) => {
  res
    .status(202).clearCookie('jwt', {
      sameSite: 'None',
      secure: true,
      httpOnly: true,
    })
    .send({ massege: 'cookie cleared' });
  next();
};

// возвращает информацию о пользователе (email и имя)
const getUser = (req, res, next) => {
  // находим пользователя по id
  const id = req.user._id;
  User.findById(id)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new ErrorBadRequest(BAD_REQUEST));
      } else {
        next(err);
      }
    });
};

// обновляет информацию о пользователе (email и имя)
const updateUser = (req, res, next) => {
  // находим пользователя по id
  const id = req.user._id;// +
  const { email, name } = req.body;// +
  User.findByIdAndUpdate(id, { email, name }, { new: true, runValidators: true })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new ErrorBadRequest(BAD_REQUEST));
      } else if (err.code === 11000) {
        next(new ErrorConflict(ERR_CONFLICT));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createUser,
  login,
  getSignout,
  getUser,
  updateUser,
};

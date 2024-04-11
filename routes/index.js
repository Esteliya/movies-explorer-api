const express = require('express');
// подключили роуты
const usersRouter = require('./users');
const moviesRouter = require('./movies');
// мидлвары
const { auth } = require('../middlewares/auth');
// контроллеры
const { createUser, login, getSignout } = require('../controllers/users');
// валидация
const { loginValid, chekinValid } = require('../configs/validation');
// ошибки
const ErrorNotFound = require('../errors/ErrorNotFound');
// ответы
const { NOTFOUND_PAGE } = require('../configs/response');

const routers = express();

// роут регистрации + валидация
routers.post('/signup', chekinValid, createUser);

// роут авторизации + валидация
routers.post('/signin', loginValid, login);

// защищаем роуты авторизацией: клиент не прислал JWT => доступ к роутам ему закрыт.
routers.use(auth);

// слушаем роуты
routers.get('/signout', getSignout);
routers.use('/users', usersRouter);
routers.use('/movies', moviesRouter);

routers.use('/*', (req, res, next) => {
  next(new ErrorNotFound(NOTFOUND_PAGE));
});

module.exports = routers;

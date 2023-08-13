const express = require('express');
// подключили роуты
const usersRouter = require('./users');
const moviesRouter = require('./movies');
// мидлвары
const { auth } = require('../middlewares/auth');
// контроллеры
const { createUser, login } = require('../controllers/users');
// валидация
const { loginValid, chekinValid } = require('../configs/validation');

const routers = express();

// роут регистрации + валидация
routers.post('/signup', chekinValid, createUser);

// роут авторизации + валидация
routers.post('/signin', loginValid, login);

// защищаем роуты авторизацией: клиент не прислал JWT => доступ к роутам ему закрыт.
routers.use(auth);

// слушаем роуты
routers.use('/users', usersRouter);
routers.use('/movies', moviesRouter);

module.exports = routers;

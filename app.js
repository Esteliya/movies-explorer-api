require('dotenv').config();// получаем доступ к .env
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');// чтобы читать JSON
const cookieParser = require('cookie-parser');// работаем с куками
// const { celebrate, Joi, errors } = require('celebrate');// валидация
const { errors } = require('celebrate');// валидация
const mongoose = require('mongoose');// могнус БД
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');// логги
// подключили роуты
const usersRouter = require('./routes/users');
const moviesRouter = require('./routes/movies');
// контроллеры
const { createUser, login } = require('./controllers/users');
// мидлвары
const { auth } = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
// ошибки
const ErrorNotFound = require('./errors/ErrorNotFound');
// валидация
const { loginValid, chekinValid } = require('./configs/validation');

// env переменные
const {
  NODE_ENV = 'development',
  DB_PRODUCTION,
  PORT = 3001,
  DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb',
} = process.env;

const app = express();

const corsOptions = {
  origin: [
    'https://mymovies.nomoreparties.co',
    'http://localhost:3000',
    'http://localhost:3001',
  ],
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: true,
};

app.use(cors(corsOptions));

// защищаем приложение, применяя библиотеку Helmet
app.use(helmet());

// ПАРСЕРЫ
// извлекаем тело ответа
app.use(bodyParser.json());
// подключаем cookie-parser (анализирует cookie и записывает данные в req.cookies)
app.use(cookieParser());

// подключаем логгер запросов
app.use(requestLogger);

// роут регистрации + валидация
app.post('/signup', chekinValid, createUser);

// роут авторизации + валидация
app.post('/signin', loginValid, login);

// защищаем роуты авторизацией: клиент не прислал JWT => доступ к роутам ему закрыт.
app.use(auth);

// слушаем роуты
app.use('/users', usersRouter);
app.use('/movies', moviesRouter);

// дружим с данными из .env
mongoose.connect(NODE_ENV === 'production' ? DB_PRODUCTION : DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true,
  family: 4,
});

app.use('/*', (req, res, next) => {
  next(new ErrorNotFound('Ой! Такой страницы не существует!'));
});

// подключаем логгер ошибок
app.use(errorLogger);

app.use(errors());// ошибки celebrate
// централизованный обработчик ошибок
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Сервер запущен на ${PORT} порту`);
});

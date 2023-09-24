require('dotenv').config();// получаем доступ к .env
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');// чтобы читать JSON
const cookieParser = require('cookie-parser');// работаем с куками
const { errors } = require('celebrate');// валидация
const mongoose = require('mongoose');// могнус БД
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');// логги
// подключили роуты
const routers = require('./routes/index');
// мидлвары
const errorHandler = require('./middlewares/errorHandler');
// лимит запросов
const limiter = require('./configs/limiter');
// опции cors
const corsOptions = require('./configs/cors');

// env переменные
const {
  NODE_ENV = 'development',
  DB_PRODUCTION,
  PORT = 3001,
  DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb',
} = process.env;

const app = express();

// применяем лимит запросов
app.use(limiter);

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

// подключаем ВСЕ роуты
app.use(routers);

// дружим с данными из .env
mongoose.connect(NODE_ENV === 'production' ? DB_PRODUCTION : DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true,
  family: 4,
});

// подключаем логгер ошибок
app.use(errorLogger);

app.use(errors());// ошибки celebrate

// централизованный обработчик ошибок
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Сервер запущен на ${PORT} порту`);
});

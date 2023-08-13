const rateLimit = require('express-rate-limit');// ограничиваем число запросов

// устанавливаем ограницение запросов: 100 запросов за 15 минут
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

module.exports = limiter;

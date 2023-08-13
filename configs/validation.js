const { celebrate, Joi } = require('celebrate');// валидация

// регулярки
const regUrl = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/;
const regEn = /^[a-zA-Z\s-]+$/;

// валидация логина
const loginValid = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

// валидация регистрации
const chekinValid = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
  }),
});

// валидация добавления фильма
const movieVali = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(regUrl),
    trailerLink: Joi.string().required().pattern(regUrl),
    thumbnail: Joi.string().required().pattern(regUrl),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required().pattern(regEn),
  }),
});

// валидация id фильма (цифры + латинские буквы)
// + максимальная длина для примера 25 знаков (взято из БД)
const movieIdValid = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().hex().length(24),
  }),
});

module.exports = {
  loginValid,
  chekinValid,
  movieVali,
  movieIdValid,
};

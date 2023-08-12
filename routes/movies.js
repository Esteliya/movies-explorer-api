const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const { createMovies, getMovies, deleteMovies } = require('../controllers/movies');

// возвращает все сохранённые текущим пользователем фильмы
router.get('/', getMovies);

// создаёт фильм с переданными в теле
router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/),
      trailerLink: Joi.string().required().pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/),
      thumbnail: Joi.string().required().pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/),
      movieId: Joi.number().required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required().pattern(/^[a-zA-Z\s-]+$/),
    }),
  }),
  createMovies,
);

// удаляет сохранённый фильм по id
router.delete('/:id', deleteMovies);

module.exports = router;

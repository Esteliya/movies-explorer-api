const Movies = require('../models/movie');
const ErrorBadRequest = require('../errors/ErrorBadRequest');// 400

// возвращает все сохранённые текущим пользователем фильмы
//GET /movies


// создаёт фильм с переданными в теле
const createMovies = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;// id пользователя
  Movies.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    owner,
    nameRU,
    nameEN,
  })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((err) => {
      // res.send(err)
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new ErrorBadRequest('Введены некоректные данны'));
      } else {
        next(err);
      }
    });
};

// удаляет сохранённый фильм по id
//DELETE /movies/_id

// экспорт
module.exports = {
  createMovies,
};

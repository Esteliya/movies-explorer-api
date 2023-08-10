const Movies = require('../models/movie');
const ErrorBadRequest = require('../errors/ErrorBadRequest');// 400
const ErrorForbidden = require('../errors/ErrorForbidden');// 403
const ErrorNotFound = require('../errors/ErrorNotFound');// 404

// возвращает все сохранённые текущим пользователем фильмы
const getMovies = (req, res, next) => {
  const userId = req.user._id;
  Movies.find({ owner: userId })
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

// создаёт фильм с переданными в теле данными
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
const deleteMovies = (req, res, next) => {
  const { id } = req.params;
  Movies.findById(id)
    .orFail(() => next(new ErrorNotFound('Фильм не найден')))
    .then((movie) => {
      // фильм пользователя?
      // нет - удаление невозможно
      if (req.user._id !== movie.owner.toString()) {
        next(new ErrorForbidden('У вас нет прав на удалениие данного фильма'));
      } else {
        // если да, то удаляем фильм
        Movies.findByIdAndRemove(id)
          .then(() => {
            res.send({ message: 'Фильм успешно удален' });
          });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new ErrorBadRequest('Введены некоректные данны'));
      } else {
        next(err);
      }
    });
};

// экспорт
module.exports = {
  createMovies,
  getMovies,
  deleteMovies,
};

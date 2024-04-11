const Movies = require('../models/movie');
const ErrorBadRequest = require('../errors/ErrorBadRequest');// 400
const ErrorForbidden = require('../errors/ErrorForbidden');// 403
const ErrorNotFound = require('../errors/ErrorNotFound');// 404

// константы сообщений ответов
const {
  BAD_REQUEST,
  ERR_FORBIDDEN,
  NOTFOUND,
} = require('../configs/response');

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
        next(new ErrorBadRequest(BAD_REQUEST));
      } else {
        next(err);
      }
    });
};

// удаляет сохранённый фильм по id
const deleteMovies = (req, res, next) => {
  const { id } = req.params;
  Movies.findById(id)
    .orFail(() => next(new ErrorNotFound(NOTFOUND)))
    .then((movie) => {
      // фильм пользователя?
      // нет - удаление невозможно
      if (req.user._id !== movie.owner.toString()) {
        next(new ErrorForbidden(ERR_FORBIDDEN));
      } else {
        // если да, то удаляем фильм
        Movies.deleteOne(movie)
          .then(() => {
            res.send({ message: 'Фильм успешно удален' });
          })
          .catch(next);// если произошла ошибка удаления => падаем в ошибки
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new ErrorBadRequest(BAD_REQUEST));
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

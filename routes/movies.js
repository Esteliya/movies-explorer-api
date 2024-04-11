const router = require('express').Router();

const { createMovies, getMovies, deleteMovies } = require('../controllers/movies');
// валидация
const { movieVali, movieIdValid } = require('../configs/validation');

// возвращает все сохранённые текущим пользователем фильмы
router.get('/', getMovies);

// создаёт фильм с переданными в теле + валидация
router.post('/', movieVali, createMovies);

// удаляет сохранённый фильм по id + валидация
router.delete('/:id', movieIdValid, deleteMovies);

module.exports = router;

const router = require('express').Router();
const { createMovies, getMovies, deleteMovies } = require('../controllers/movies');

// возвращает все сохранённые текущим пользователем фильмы
router.get('/', getMovies);

// создаёт фильм с переданными в теле
router.post('/', createMovies);

// удаляет сохранённый фильм по id
router.delete('/:id', deleteMovies);

module.exports = router;

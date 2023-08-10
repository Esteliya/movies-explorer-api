const router = require('express').Router();
const { createMovies } = require('../controllers/movies');

// возвращает все сохранённые текущим пользователем фильмы
// GET /movies

// создаёт фильм с переданными в теле
router.post('/', createMovies);

// удаляет сохранённый фильм по id
// DELETE /movies/_id

module.exports = router;

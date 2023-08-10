// const { celebrate, Joi } = require('celebrate');// валидация
const router = require('express').Router();
const {
  getSignout,
  getUser,
  updateUser,
} = require('../controllers/users');

// выход из аккаунта
router.get('/signout', getSignout);

// возвращает информацию о пользователе (email и имя)
// GET /users/me
router.get('/me', getUser);

// обновляет информацию о пользователе (email и имя)
// PATCH /users/me
router.patch('/me', updateUser);

module.exports = router;

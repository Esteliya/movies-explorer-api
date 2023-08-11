const { celebrate, Joi } = require('celebrate');// валидация
const router = require('express').Router();
const {
  getSignout,
  getUser,
  updateUser,
} = require('../controllers/users');

// выход из аккаунта
router.get('/signout', getSignout);

// возвращает информацию о пользователе (email и имя)
router.get('/me', getUser);

// обновляет информацию о пользователе
router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email(),
      password: Joi.string().min(8),
      name: Joi.string().min(2).max(30),
    }),
  }),
  updateUser,
);

module.exports = router;

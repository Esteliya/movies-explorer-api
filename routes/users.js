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
router.patch('/me', updateUser);

module.exports = router;

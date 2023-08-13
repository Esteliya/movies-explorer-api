const router = require('express').Router();
const {
  getUser,
  updateUser,
} = require('../controllers/users');

// возвращает информацию о пользователе (email и имя)
router.get('/me', getUser);

// обновляет информацию о пользователе
router.patch('/me', updateUser);

module.exports = router;

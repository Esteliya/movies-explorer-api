const router = require('express').Router();

const { userUpdateValid } = require('../configs/validation');

const {
  getUser,
  updateUser,
} = require('../controllers/users');

// возвращает информацию о пользователе (email и имя)
router.get('/me', getUser);

// обновляет информацию о пользователе
router.patch('/me', userUpdateValid, updateUser);

module.exports = router;

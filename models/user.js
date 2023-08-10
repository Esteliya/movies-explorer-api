const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, 'Поле "email" обязательно для заполнения'],
      validate: {
        validator: (v) => validator.isEmail(v),
        message: 'Некорректный email',
      },
    },
    password: {
      type: String,
      required: [true, 'Поле "password" обязательно для заполнения'],
      validate: {
        validator: (v) => validator.isStrongPassword(v),
        message: 'Ненадежный пароль. Пароль должен быль не менее 8 символов и содержать цифру, прописную и строчную буквы.',
      },
    },
    name: {
      type: String,
      required: [true, 'Поле "name" обязательно для заполнения'],
      minLength: [2, 'Минимальная длина поля "name" - 2'],
      maxLength: [30, 'Максимальная длина поля "name" - 30'],
    },
  },
  { versionKey: false },
);
// удаляем поле password из результата выдачи
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

const User = mongoose.model('user', userSchema);

module.exports = User;

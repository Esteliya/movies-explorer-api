const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: [true, 'Поле "country" обязательно для заполнения'],
    },
    director: {
      type: String,
      required: [true, 'Поле "director" обязательно для заполнения'],
    },
    duration: {
      type: Number,
      required: [true, 'Поле "duration" обязательно для заполнения'],
    },
    year: {
      type: String,
      required: [true, 'Поле "year" обязательно для заполнения'],
    },
    description: {
      type: String,
      required: [true, 'Поле "description" обязательно для заполнения'],
    },
    image: {
      type: String,
      validate: {
        validator: (v) => validator.isURL(v),
        message: 'Некорректный URL',
      },
      required: [true, 'Поле "image" обязательно для заполнения'],
    },
    trailerLink: {
      type: String,
      validate: {
        validator: (v) => validator.isURL(v),
        message: 'Некорректный URL',
      },
      required: [true, 'Поле "trailerLink" обязательно для заполнения'],
    },
    thumbnail: {
      type: String,
      validate: {
        validator: (v) => validator.isURL(v),
        message: 'Некорректный URL',
      },
      required: [true, 'Поле "trailerLink" обязательно для заполнения'],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    movieId: {
      type: Number,
      required: [true, 'Поле "movieId" обязательно для заполнения'],
    },
    nameRU: {
      type: String,
      required: [true, 'Поле "nameRU" обязательно для заполнения'],
    },
    nameEN: {
      type: String,
      required: [true, 'Поле "nameEN" обязательно для заполнения'],
    },
  },
);

const Movie = mongoose.model('movie', movieSchema);

module.exports = Movie;

const corsOptions = {
  origin: [
    'https://mymovies.nomoreparties.co',
    'http://localhost:3000',
    'http://localhost:3001',
  ],
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: true,
};

module.exports = corsOptions;

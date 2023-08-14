// код ответов: 400, 401, 403, 404, 409, 500.
const CODE_400 = '400';// ErrorBadRequest
const CODE_401 = '401';// ErrorAuth
const CODE_403 = '403';// ErrorForbidden
const CODE_404 = '404';// ErrorNotFound
const CODE_409 = '409';// ErrorConflict
const CODE_500 = '500';// Сервер

// сообщения ответов
const BAD_REQUEST = 'Введены некоректные данны';// 400
const ERR_AUTH = 'Пользователя с таким email или паролем не существует';// 401
const ERR_AUTH_TOTAL = 'Пользователя с таким email или паролем не существует';// 401
const ERR_REQ_AUTH = 'Доступ к запрашиваемому ресурсу закрыт. Требуется аутентификация';// 401
const ERR_FORBIDDEN = 'У вас нет прав на удалениие данного фильма';// 403
const NOTFOUND = 'Фильм не найден';// 404
const NOTFOUND_PAGE = 'Ой! Такой страницы не существует!';// 404
const ERR_CONFLICT = 'Пользователь с таким email уже зарегистрирован';// 409
const ERR_HOST = 'На сервере произошла ошибка';// 500

module.exports = {
  CODE_400,
  CODE_401,
  CODE_403,
  CODE_404,
  CODE_409,
  CODE_500,
  BAD_REQUEST,
  ERR_AUTH,
  ERR_AUTH_TOTAL,
  ERR_REQ_AUTH,
  ERR_FORBIDDEN,
  NOTFOUND,
  NOTFOUND_PAGE,
  ERR_CONFLICT,
  ERR_HOST,
};

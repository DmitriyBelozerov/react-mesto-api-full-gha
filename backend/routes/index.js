const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const usersRouter = require('./users');
const cardsRouter = require('./cards');
const auth = require('../middlewares/auth');

const { createUser, login } = require('../controllers/users');

const regEx = /(https?:\/\/)(w{3}\.)?([a-zA-Z0-9-]{0,100}\.)([a-zA-Z]{2,6})(\/[\w\-._~:/?#[\]@!$&'()*+,;=]#?)?/;

router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(regEx),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  createUser,
);

router.use(auth);
router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

module.exports = router;

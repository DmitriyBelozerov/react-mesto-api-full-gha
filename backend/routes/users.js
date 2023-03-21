const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers, getСurrentUser, getUserById, updateUser, updateAvatar, unLogin,
} = require('../controllers/users');

const regEx = /(https?:\/\/)(w{3}\.)?([a-zA-Z0-9-]{0,100}\.)([a-zA-Z]{2,6})(\/[\w\-._~:/?#[\]@!$&'()*+,;=]#?)?/;

router.get(
  '/',
  getUsers,
);

router.get(
  '/me',
  getСurrentUser,
);

router.post(
  '/me',
  unLogin,
);

router.get(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().length(24).hex().required(),
    }),
  }),
  getUserById,
);

router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      about: Joi.string().min(2).max(30).required(),
    }),
  }),
  updateUser,
);

router.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().pattern(regEx),
    }),
  }),
  updateAvatar,
);

module.exports = router;

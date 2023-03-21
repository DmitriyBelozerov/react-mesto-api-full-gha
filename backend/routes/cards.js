const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const regEx = /(https?:\/\/)(w{3}\.)?([a-zA-Z0-9-]{0,100}\.)([a-zA-Z]{2,6})(\/[\w\-._~:/?#[\]@!$&'()*+,;=]#?)?/;

const {
  getCards, createCard, deleteCard, likeCard, deletelikeCard,
} = require('../controllers/cards');

router.get('/', getCards);

router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().pattern(regEx),
    }),
  }),
  createCard,
);

router.delete(
  '/:cardId',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex().required(),
    }),
  }),
  deleteCard,
);

router.put(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex().required(),
    }),
  }),
  likeCard,
);

router.delete(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().length(24).hex().required(),
    }),
  }),
  deletelikeCard,
);

module.exports = router;

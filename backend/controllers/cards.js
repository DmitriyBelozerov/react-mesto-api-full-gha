const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const UserAccessError = require('../errors/user-access-err');
const ValidationError = require('../errors/validation-err');

const NO_ERRORS = 200;

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.status(NO_ERRORS).send(cards);
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(NO_ERRORS).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные при создании карточки'));
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      } else if (!card.owner.equals(req.user._id)) {
        throw new UserAccessError('Нельзя удалять карточки других пользователей');
      } else {
        Card.findByIdAndRemove(req.params.cardId)
          .then(() => {
            res.status(NO_ERRORS).send({ data: card });
          })
          .catch((err) => next(err));
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new ValidationError('Переданы некорректные данные при удалении карточки'));
      } else {
        next(err);
      }
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError(`Карточка c данным ID: ${req.params.cardId} не найдена`);
      } else {
        res.status(NO_ERRORS).send({ data: card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Переданы некорректные данные при создании лайка карточки'));
      } else {
        next(err);
      }
    });
};

const deletelikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new NotFoundError(`Карточка c данным ID: ${req.params.cardId} не найдена`);
      } else {
        res.status(NO_ERRORS).send({ data: card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Переданы некорректные данные при удалении лайка карточки'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createCard, getCards, deleteCard, likeCard, deletelikeCard,
};

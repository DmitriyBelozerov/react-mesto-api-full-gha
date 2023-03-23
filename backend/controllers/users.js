const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

const NO_ERRORS = 200;
const NotFoundError = require('../errors/not-found-err');
const UniqueEmailError = require('../errors/unique-email-err');
const ValidationError = require('../errors/validation-err');

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'secret-key',
        { expiresIn: '7d' },
      );
      res.cookie(
        'jwt',
        token,
        { maxAge: 3600000 * 24 * 7, httpOnly: true, sameSite: true },
      )
        .send({ token });
    })
    .catch(next);
};

const unLogin = (req, res, next) => {
  try {
    res.clearCookie('jwt');
    res.end();
  } catch (err) {
    next(err);
  }
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.status(NO_ERRORS).send({ data: users });
    })
    .catch(next);
};

const getСurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Текущий пользователь не найден'));
      } else {
        res.status(NO_ERRORS).send({ data: user });
      }
    })
    .catch(next);
};

const getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      } else {
        res.status(NO_ERRORS).send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Переданы некорректные данные при запросе пользователя'));
      } else {
        next(err);
      }
    });
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email,
  } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    })
      .then((user) => {
        res.status(NO_ERRORS).send({
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          email: user.email,
        });
      }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные при создании пользователя'));
      } else if (err.code === 11000) {
        next(new UniqueEmailError('Пользователь с таким Email уже существует'));
      } else {
        next(err);
      }
    });
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с указанным _id не найден');
      } else {
        res.status(NO_ERRORS).send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Переданы некорректные данные при обновлении профиля пользователя'));
      } else {
        next(err);
      }
    });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return new NotFoundError('Запрашиваемый пользователь не найден');
      }
      res.status(NO_ERRORS).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Переданы некорректные данные при обновлении аватара пользователя'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getUsers, getСurrentUser, getUserById, createUser, updateUser, updateAvatar, login, unLogin,
};

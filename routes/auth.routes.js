const router = require('express').Router();
const UserModel = require('../models/User.model');
const bcrypt = require('bcryptjs');

//SIGN UP
router.get('/signup', (req, res, next) => {
  res.render('auth/signup.hbs');
});

router.post('/signup', (req, res, next) => {
  const { username, password } = req.body;

  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);

  UserModel.create({ username, password: hash })
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => {
      next(err);
    });
});

//SIGN IN

router.get('/login', (req, res, next) => {
  res.render('auth/login.hbs');
});

router.post('/login', (req, res, next) => {
  const { username, password } = req.body;

  let isMatching = bcrypt.compareSync(password, userObj.password);
  if (isMatching) {
    req.session.myProperty = userObj;
    res.redirect('/profile');
  } else {
    res.render('auth/login.hbs', { error: 'Not matching' });
    return;
  }
});

//LOGIN USER

const checkLogIn = (req, res, next) => {
  if (req.session.myProperty) {
    next();
  } else {
    res.redirect('/login');
  }
};

router.get('/profile', checkLogIn, (req, res) => {
  let usersInfo = req.session.myProperty;
  res.render('auth/profile.hbs', { username: usersInfo.username });
});

router.get('/main', checkLogIn, (req, res) => {
  res.render('main.hbs');
});

router.get('/private', checkLogIn, (req, res) => {
  res.render('private.hbs');
});

module.exports = router;

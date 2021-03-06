const { isEmpty } = require('../../models/helper-functions');

function validateSignUpForm(req, res, next) {
  const { name, email, password } = req.body;

  if ( isEmpty(name, email, password) )
    next(new Error('empty sign-up field'));
  else next();
}

function validateSignInForm(req, res, next) {
  const { email, password } = req.body;

  if ( isEmpty(email, password) )
    next(new Error('empty sign-in field'));
  else next();
}

function validatePostReviewForm(req, res, next) {
  const { content } = req.body;

  if ( isEmpty(content) )
    next(new Error('empty review post'));
  else next();
}

function isLoggedIn(req, res, next) {
  if (!req.session.user) {
    req.isLoggedIn = false;
  }
  else if (req.query.isLoggedIn === 'false') {
    req.isLoggedIn = false;
  }
  else if (req.session.user) {
    req.isLoggedIn = true;
  }
  next();
}

module.exports = {
  validateSignUpForm,
  validateSignInForm,
  validatePostReviewForm,
  isLoggedIn
}

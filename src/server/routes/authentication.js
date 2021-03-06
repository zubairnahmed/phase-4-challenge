const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const { validateSignInForm, isLoggedIn } = require('../middlewares/validation');
const { signOutUser } = require('../../models/helper-functions');
const user = require('../../models/users');
const reviews = require('../../models/reviews');

const urlEncodedParser = bodyParser.urlencoded({ extended: false });

router.get('/sign-up', (req, res) => {
  res.render('sign-up', { error: false });
});

router.route('/sign-in')
  .get((req, res) => {
    res.render('sign-in', { error: false });
  })
  .post(urlEncodedParser, validateSignInForm, (req, res, next) => {
    const credentials = req.body;

    user.loginByEmail(credentials, req)
      .then((user) => {
        res.redirect(`users/${user.id}`);
      })
      .catch((error) => {
        console.log('An error occured while logging in user::', error);
        next(new Error('incorrect email and/or password'));
      })
  });

router.get('/sign-out', (req, res) => {
  signOutUser(req);
  res.redirect('/?isloggedIn=false');
})

module.exports = router;

module.exports = (err, req, res, next) => {
  switch (err.message) {

    case 'user exists':
      res.render('sign-up', { error: 'user exists' });
      break;

    case 'empty sign-up field':
      res.render('sign-up', { error: 'empty sign-up field' });
      break;

    case 'empty sign-in field':
      res.render('sign-in', { error: 'empty sign-in field' });
      break;

    case 'incorrect email and/or password':
      res.render('sign-in', { error: 'incorrect email and/or password' });
      break;

    case 'empty review post':
      const { album_title: title, album_id: id} = req.body;
      const album = { title, id };
      res.render('review', { error: 'empty review post', album });
      break;

    default:
      res.render('error', { error: err });

  }
};

exports.getHome = (req, res, next) => {
  res.render('index', { pageTitle: 'Home Page', auth: req.session.userId });
};

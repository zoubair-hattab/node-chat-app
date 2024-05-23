const {
  getInfoProfile,
  getEditProfile,
  postEditProfile,
} = require('../models/user.model');

exports.getProfile = (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    res.redirect(`/profile/${req.session.userId}`);
  }
  getInfoProfile(id)
    .then((userInfo) => {
      res.render('profile', {
        pageTitle: `Profile ${userInfo.username}`,
        auth: true,
        userInfo,
        isOwner: id == req.session.userId,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
exports.getPageEdit = (req, res, next) => {
  if (req.params.id != req.session.userId.toString())
    return res.redirect('/profile/edit/' + req.session.userId);
  getEditProfile(req.session.userId.toString())
    .then((userInfo) => {
      res.render('edit', {
        pageTitle: 'Edit Page',
        auth: true,
        id: req.session.userId,
        userInfo,
        errorInRegistration: '',
        validatorInput: [],
      });
    })
    .catch((error) => {
      res.redirect('/error');
    });
};
exports.editePage = (req, res, next) => {
  const data = {
    email: req.body.email,
    username: req.body.username,
    avatar: req.file.path,
  };
  postEditProfile(req.session.userId, data)
    .then(() => {
      res.redirect('/profile');
    })
    .catch((error) => {
      req.flash('errorInRegistration', error);
    });
};

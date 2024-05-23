const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'username is required.'],
  },
  email: {
    type: String,
    required: [true, 'email is required.'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'password is required.'],
  },
  image: {
    type: String,
    default: 'images.png',
  },
  friends: {
    type: [{ name: String, avatar: String, id: String, chatId: String }],
    default: [],
  },
  friendRequests: {
    type: [{ name: String, id: String }],
    default: [],
  },
  sentRequests: {
    type: [{ name: String, id: String }],
    default: [],
  },
});
const User = mongoose.models.User || mongoose.model('User', userSchema);

exports.getInfoProfile = (id) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(process.env.URL_DB)
      .then(() => {
        return User.findById(id);
      })
      .then((userInfo) => {
        if (userInfo) {
          // mongoose.disconnect();
          resolve(userInfo);
        } else {
          mongoose.disconnect();
          reject('User Not Found');
        }
      })
      .catch((error) => {
        mongoose.disconnect();
        reject(error);
      });
  });
};

exports.getEditProfile = (id) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(process.env.URL_DB)
      .then(() => {
        return User.findById(id);
      })
      .then((user) => {
        console.log(user);
        if (!user) {
          mongoose.disconnect();
          reject('User not found');
        } else {
          resolve(user);
        }
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

exports.postEditProfile = (id, data) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(process.env.URL_DB)
      .then(() => {
        return User.findByIdAndUpdate(id, { $set: { ...data } });
      })
      .then(() => {
        mongoose.disconnect();
        resolve('User Has been Updated');
      })
      .catch((error) => {
        mongoose.disconnect();
        reject(reject);
      });
  });
};
exports.User = User;

const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const { User } = require('./user.model');
/**--------------------------Registration Part Starts ------------------------ */

exports.createUser = (data) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(process.env.URL_DB)
      .then(() => {
        return User.findOne({ email: data.email });
      })
      .then((user) => {
        if (!user) {
          const passwordHash = bcryptjs.hashSync(data.password, 10);
          const newUser = new User({
            ...data,
            password: passwordHash,
          });
          return newUser.save();
        } else {
          mongoose.disconnect();
          reject('user already exist.');
        }
      })
      .then(() => {
        mongoose.disconnect();
        resolve();
      })
      .catch((error) => {
        mongoose.disconnect();
        reject(error);
      });
  });
};
/**--------------------------Registration Part Ends ------------------------ */
/**--------------------------Login Part Strts ------------------------ */
exports.login = (data) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(process.env.URL_DB)
      .then(() => {
        return User.findOne({ email: data?.email });
      })
      .then((user) => {
        if (!user) {
          mongoose.disconnect();
          reject('Wrong in your credtial.');
        } else {
          const isSame = bcryptjs.compareSync(data?.password, user?.password);

          if (isSame) {
            mongoose.disconnect();
            resolve(user);
          } else {
            mongoose.disconnect();
            reject('Wrong in your credtial.');
          }
        }
      })

      .catch((error) => {
        console.log(error);
        mongoose.disconnect();
        reject(error);
      });
  });
};
/**--------------------------Login Part Ends ------------------------ */

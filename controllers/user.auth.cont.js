const jwt = require("jsonwebtoken");
const Users = require("../models/User");

const config = require("../config");

const register = body => {
  return new Promise((resolve, reject) => {
    const savable = new Users(body);
    savable.save((error, saved) => {
      if (error && error.errors.email) {
        return reject(new Error(error.errors.email.message));
      } else if (error && error.errors.username) {
        return reject(new Error(error.errors.username.message));
      }
      return resolve(saved);
    });
  });
};

const login = body => {
  return new Promise((resolve, reject) => {
    Users.findOne({ username: body.username })
      .exec()
      .then(user => {
        if (!user) {
          return reject(new Error("User Not found"));
        }
        user.comparePassword(body.password, (error, isMatch) => {
          if (isMatch && !error) {
            var token = jwt.sign(user.toObject(), config.JWT.secret, {
              expiresIn: config.JWT.expire
            });
            return resolve({ token: token, user: user });
          } else {
            return reject(new Error("wrong password"));
          }
        });
      })
      .catch(error => {
        return reject(error);
      });
  });
};

module.exports = {
  register,
  login
};

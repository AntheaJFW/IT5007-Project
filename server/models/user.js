const { Schema, model } = require('mongoose');
var bcrypt = require('bcrypt');
const saltRounds = 10;

var UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      index: true,
    },
    hashed_password: String,
  },
  {
    methods: {
      validateUser(password) {
        return bcrypt.compare(password, this.hashed_password);
      },
      toJSON() {
        // Method to return object to frontend
        var user = this.toObject();
        delete user.hashed_password;
        delete user._id;
        delete user.__v;
        return user;
      },
    },
  }
);

var User = model('User', UserSchema);

module.exports = User;

var mongoose = require("mongoose");
var bcrypt = require("bcrypt");

var usrSchema = mongoose.Schema({
  username: String,
  password: String,
  email: String,
  firstName: String,
  lastName: String,
  company: String,
  address: String,
  cel: String,
  tel: String,
  pic: String,
  aproved: {
    type: Boolean,
    default: false,
  },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

// generate a hash for password
usrSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

// Check if given password is valid
usrSchema.methods.validPassword = function (user, password) {
  return bcrypt.compareSync(password, user.password);
};

usrSchema.virtual("StartISODate", {
  ref: "Appointment",
  localField: "_id",
  foreignField: "UserId",
  justOne: false,
});

module.exports = mongoose.model("User", usrSchema);
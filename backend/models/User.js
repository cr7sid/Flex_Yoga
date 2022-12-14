var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var SALT_WORK_FACTOR = 10;
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var UserSchema = new Schema(
  {
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    phone_number: {type: Number},
    batch: {type: Number, required: true, default: 0},
    age: {type: Number, required: true},
    subscription_time: {type: Date, default: null}
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", function (next) {
  var user = this;
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);
    //hash the paasword with our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  var user = this;
  bcrypt.compare(
    candidatePassword,
    user.password,
    function (err, isMatch) {
      if (err) return cb(err, null);
      cb(null, isMatch);
    }
  );
};

//0 -> pending
//1 -> 5-6
//2 -> 6-7
//3 -> 7-8
//4 -> 8-9


mongoose.model("User", UserSchema);

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//schema user
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide a name"],
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "please provide an email"],
    minlength: 3,
    maxlength: 50,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "please provide a valid email",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "please provide a password"],
    minlength: 6,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
});

//crypt password
UserSchema.pre("save", async function () {
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (err) {
    console.log(err);
  }
});

// login methods
UserSchema.methods.getName = function () {
  return this.name;
};

UserSchema.methods.comparePassword = async function (candidatePasssword) {
  const isMatch = await bcrypt.compare(candidatePasssword, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", UserSchema);

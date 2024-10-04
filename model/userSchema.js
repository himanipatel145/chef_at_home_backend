const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: [true, "Email id already present"],
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email");
        }
      },
    },
    phone: {
      type: Number,
      required: true,
      min: 10,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error('Can not contain the string "Password"');
        }
      },
    },
  },
  { timestamps: true, versionKey: false }
);

//hash password
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

//generate-auth token
UserSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    this.token = token;
    await this.save();
    return token;
  } catch (error) {
    console.log("Error", error);
  }
};

//compare password
UserSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model("user", UserSchema);
module.exports = User;

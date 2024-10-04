const mongoose = require("mongoose");
const validator = require("validator");

const ClientSchema = mongoose.Schema(
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

const Client = mongoose.model("client", ClientSchema);
module.exports = Client;

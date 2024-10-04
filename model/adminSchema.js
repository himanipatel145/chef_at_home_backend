const mongoose = require("mongoose");
const validator = require("validator");

const AdminSchema = mongoose.Schema(
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
  },
  { timestamps: true, versionKey: false }
);

const Admin = mongoose.model("admin", AdminSchema);
module.exports = Admin;

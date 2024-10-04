const express = require("express");
const router = express.Router();
const User = require("../model/userSchema");

router.post("/registerUser", async (req, res) => {
  const {
    firstName,
    lastName,
    fullName,
    phone,
    email,
    password,
    confirmPassword,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !fullName ||
    !phone ||
    !email ||
    !password ||
    !confirmPassword
  ) {
    return res.status(422).json({ error: "Fill the fields properly" });
  }
  try {
    const userExist = await User.findOne({ email: email });
    const checkPassword = (await password) !== confirmPassword;

    if (userExist) {
      res.status(422).json({ error: "User already exists!" });
    } else if (checkPassword) {
      res.status(422).json({ error: "Password not match!" });
    } else {
      const newUser = new User({
        firstName,
        lastName,
        fullName,
        email,
        phone,
        password,
        confirmPassword,
      });
      const creatNewUser = await newUser.save();
      if (creatNewUser) {
        res
          .status(201)
          .json({ message: "User Created Successfully!!", user: creatNewUser });
      }
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error in creating contact", error: error });
  }
});

router.post("/loginUser", async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExist = await User.findOne({ email: email });
    const isPasswordMatch = await userExist.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(422).json({ error: "Password not match!" });
    }

    const token = await userExist.generateAuthToken();
    if (userExist) {
      res.status(201).json({
        message: "User LoginIn Successful!!",
        user: {
          email: userExist.email,
          firstName: userExist.firstName,
          lastName: userExist.lastName,
          token,
        },
      });
    } else {
      res.status(422).json({ error: "User not match!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error while login user !", error: error });
  }
});

module.exports = router;

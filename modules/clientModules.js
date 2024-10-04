const express = require("express");
const router = express.Router();
const Client = require("../model/clientSchema");

router.post("/registerClient", async (req, res) => {
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
    const userExist = await Client.findOne({ email: email });
    const checkPassword = (await password) !== confirmPassword;
    if (userExist) {
      res.status(422).json({ error: "User already exists!" });
    } else if (checkPassword) {
      res.status(422).json({ error: "Password not match!" });
    } else {
      const newClient = new Client({
        firstName,
        lastName,
        fullName,
        email,
        phone,
        password,
        confirmPassword,
      });
      const creatNewClient = await newClient.save();
      if (creatNewClient) {
        res.status(201).json({ message: "User Created Successfully!!" });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in creating client", error: error });
  }
});

router.post("/loginClient", async (req, res) => {
  const { email } = req.body;
  try {
    const userExist = await Client.findOne({ email: email });
    if (userExist) {
      res.status(201).json({ message: "Client LoginIn Successful!!" });
    } else {
      res.status(422).json({ error: "Client or Password not match!" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while login client !", error: error });
  }
});

module.exports = router;

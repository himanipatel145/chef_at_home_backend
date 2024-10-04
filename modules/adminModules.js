const express = require("express");
const router = express.Router();
const Admin = require("../model/adminSchema");
const User = require("../model/userSchema");
const Client = require("../model/clientSchema");

router.get("/getAllUsers", async (req, res) => {
  try {
    const getUsers = await User.find({});
    if (getUsers) {
      res.status(201).json(getUsers);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while fetching users data", error: error });
  }
});

router.get("/getAllClients", async (req, res) => {
  try {
    const getClients = await Client.find({});
    if (getClients) {
      res.status(201).json(getClients);
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while fetching clients data", error: error });
  }
});

module.exports = router;

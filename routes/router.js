const express = require("express");
const router = express.Router();

const adminRoutes = require("../modules/adminModules");
const userRoutes = require("../modules/userModules");
const clientRoutes = require("../modules/clientModules");

router.use("/admin", adminRoutes);
router.use("/user", userRoutes);
router.use("/client", clientRoutes);

module.exports = router;

const express = require("express");
const router = express.Router();

//Files
const UserController = require("../controllers/UserController");
const AdminController = require("../controllers/AdminController");
const SiteController = require("../controllers/SiteController");

router.post("/login", UserController.login);
router.post("/register", UserController.register);

module.exports = router;

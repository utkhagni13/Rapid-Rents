const express = require("express");
const router = express.Router();

//Files
const UserController = require("../controllers/UserController");
const AdminController = require("../controllers/AdminController");
const SiteController = require("../controllers/SiteController");
const AuthController = require("../controllers/AuthController");
const config = require("../config/Keys");

router.post("/login", UserController.login);
router.post("/register", UserController.register);

router.post("/getsessiontoken", AuthController.getSessionToken);

module.exports = router;

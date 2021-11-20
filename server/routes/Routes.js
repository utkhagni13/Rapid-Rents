const express = require("express");
const router = express.Router();

//Files
const AuthController = require("../controllers/AuthController");
const UserController = require("../controllers/UserController");
const AdminController = require("../controllers/AdminController");
const CitiesController = require("../controllers/CitiesController");
const SiteController = require("../controllers/SiteController");

// Cities
router.post("/fetchallcities", CitiesController.getCities);
router.post("/admin/addnewcity", CitiesController.addCity);

// Sites
router.post("/fetchallsites", SiteController.getRentalSites);
router.post("/admin/addnewrentalsite", SiteController.addRentalSite);

// User
router.post("/login", UserController.login);
router.post("/register", UserController.register);
router.post("/logout", AuthController.checkAuthorization, UserController.logout);
router.post("/getuserdata", AuthController.checkAuthorization, UserController.getUserData);

// router.post("/getsessiontoken", UserController.getSessionToken);

module.exports = router;

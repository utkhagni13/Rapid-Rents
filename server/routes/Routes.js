const express = require("express");
const router = express.Router();

//Files
const AuthController = require("../controllers/AuthController");
const UserController = require("../controllers/UserController");
const BookingController = require("../controllers/bookingController");
const CitiesController = require("../controllers/CitiesController");
const SiteController = require("../controllers/SiteController");

// Cities
router.post("/fetchallcities", CitiesController.getCities);
router.post("/admin/addnewcity", CitiesController.addCity);

// Sites
router.post("/fetchallsites", SiteController.getRentalSites);
router.post("/admin/addnewrentalsite", SiteController.addRentalSite);

// Bookings
router.post("/addnewbooking", AuthController.checkAuthorization, BookingController.addBooking);

// User
router.post("/login", UserController.login);
router.post("/register", UserController.register);
router.post("/logout", AuthController.checkAuthorization, UserController.logout);
router.post("/getuserdata", AuthController.checkAuthorization, UserController.getUserData);
router.post("/getpaymentorder", AuthController.checkAuthorization, UserController.paymentOrder);

module.exports = router;

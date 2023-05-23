var express = require('express');
var router = express.Router();

const validate = require("../middlewares/validateRequest");

const authController = require("../controllers/authController.js");

router.get("/health", authController.health);

router.post("/login",  validate.login, authController.login );

module.exports = router;

var express = require('express');
var router = express.Router();

const authenticate = require("../middlewares/authenticate");
const validate = require("../middlewares/validateRequest");

const userController = require("../controllers/userController.js");

router.get("/health", userController.health);

router.get("/users-list", userController.userList);

router.get("/users-details/:id", authenticate, userController.userDetails);

router.post("/users-create", validate.createUser, userController.userCreate);

router.put("/users-update", validate.updateUser, userController.userUpdate );

router.delete("/users-delete/:id", userController.userDelete);

module.exports = router;

const express = require("express");
const userController = require("../controllers/user.controller");

const router = express.Router();

// @GET all users
router.get("/",userController.getAllUsers);

// @GET user by id
router.get("/:id",userController.getUserById);

// @Patch update user
router.patch("/:id/status",userController.updateUser);

module.exports = router;
const express = require("express");
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const allowRoles = require("../middlewares/role.middleware");
const router = express.Router();

// @GET all users
router.get("/", authMiddleware, allowRoles("admin"), userController.getAllUsers);

// @GET user by id
router.get("/:id", userController.getUserById);

// @Patch update user status
router.patch("/:id/status", userController.updateUser);

module.exports = router;
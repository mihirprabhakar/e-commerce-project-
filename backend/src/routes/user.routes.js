const express = require("express");
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const allowRoles = require("../middlewares/role.middleware");
const router = express.Router();

//register theuser
router.post("/register", userController.registerUser);

// @GET all users
router.get("/", authMiddleware, allowRoles("admin"), userController.getAllUsers);

// @GET user by id

router.get("/:id", authMiddleware, allowRoles("admin"), userController.getUserById);


// @Put update user 
router.put("/:id", authMiddleware, allowRoles("admin"), userController.updateUser);

// @delete delete the user 
router.delete("/:id", authMiddleware, allowRoles("admin"), userController.deleteUser);

//@ patch update the user status
router.patch("/:id/status", authMiddleware, allowRoles("admin"), userController.updateUserStatus);

module.exports = router;
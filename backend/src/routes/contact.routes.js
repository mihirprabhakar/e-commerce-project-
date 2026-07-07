const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contact.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const allowRoles = require("../middlewares/role.middleware");

// public route
router.get("/",contactController.getContact);

// admin routes admin only
router.post("/",authMiddleware,allowRoles("admin"),contactController.createContact);
router.put("/",authMiddleware,allowRoles("admin"),contactController.updateContact);

module.exports = router;
const express = require("express");
const router = express.Router();
const aboutController = require("../controllers/about.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const allowRoles = require("../middlewares/role.middleware");

//public route anyone cal access it
router.get("/",aboutController.getAbout);

// admin routes for creation and updation
router.post("/",authMiddleware,allowRoles("admin"),aboutController.createAbout);
router.put("/",authMiddleware,allowRoles("admin"),aboutController.updateAbout);

module.exports = router;
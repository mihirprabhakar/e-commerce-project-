const express = require("express");
const router = express.Router();
const termsController = require("../controllers/terms.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const allowRoles = require("../middlewares/role.middleware");

// public route 
router.get("/", termsController.getTerms);

// admin route onlyy
router.post("/",authMiddleware,allowRoles("admin"),termsController.createTerms);
router.put("/",authMiddleware,allowRoles("admin"),termsController.updateTerms);

module.exports = router;
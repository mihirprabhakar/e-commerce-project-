const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const allowRoles = require("../middlewares/role.middleware");

router.get("/admin/dashboard", authMiddleware, allowRoles("admin"), (req, res) => {
  res.json({ success: true, message: "Welcome Admin", data: { role: req.user.role } });
});

router.get("/vendor/dashboard", authMiddleware, allowRoles("vendor"), (req, res) => {
  res.json({ success: true, message: "Welcome Vendor", data: { role: req.user.role } });
});

router.get("/customer/dashboard", authMiddleware, allowRoles("customer"), (req, res) => {
  res.json({ success: true, message: "Welcome Customer", data: { role: req.user.role } });
});

module.exports = router;
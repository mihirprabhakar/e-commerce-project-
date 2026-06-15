const express = require("express");
const { bulkInsertProducts } = require("../controllers/product.controller");

const router = express.Router();

router.post("/bulk-insert",bulkInsertProducts);

module.exports = router;
const express = require("express");
const cors = require("cors");
const app = express();
const productRoutes = require("./routes/product.routes");

app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);

// check health
app.get("/health", (req, res) => {
  res.json({ success: true, message: "Server is running" });
});

module.exports = app;
const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./routes/index");

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.json({
     success: true,
     message: "E-Commerce API is running" });
});

// check health
app.get("/health", (req, res) => {
  res.json({ success: true, message: "Server is running correctly" });
});

app.use("/api", routes);

module.exports = app;
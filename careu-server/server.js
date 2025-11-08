const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { readdirSync } = require("fs");
const sequelize = require("./config/db");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Test route
app.get("/", (req, res) => res.send("Welcome to Care U Home API"));

// Routes auto-load
readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));

// Database connection
sequelize
  .sync({ alter: true })
  .then(() => console.log("✅ Database Connected & Synced"))
  .catch((err) => console.error("❌ DB Connection Error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

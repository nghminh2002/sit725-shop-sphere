const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/database-config.js");
const apiRoutes = require("./src/routes/index.js");
const path = require("path");
const { createServer } = require("http");
const { Server } = require("socket.io");

require("dotenv").config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDB();

// API routes
app.use("/api", apiRoutes);

// Default route to serve the login page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "pages", "login.html"));
});
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "pages", "login.html"));
});
app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "pages", "register.html"));
});
app.get("/profile", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "pages", "profile.html"));
});

const port = process.env.PORT || 911;

httpServer.listen(port, () => {
  console.log("App listening to: " + port);
});

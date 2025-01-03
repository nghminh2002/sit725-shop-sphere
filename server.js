const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 3000;

// initialize socket.io
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const connectDB = require("./server/config/database-config.js");
const apiRoutes = require("./server/routes/index.js");

require("dotenv").config();

connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// API routes
app.use("/api", apiRoutes);

// Default route to serve the login page
app.get("/", (req, res) => {
  res.render("login");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/register", (req, res) => {
  res.render("register");
});
app.get("/profile", (req, res) => {
  res.render("profile");
});

server.listen(port, () => {
  console.log("App listening to: " + port);
});

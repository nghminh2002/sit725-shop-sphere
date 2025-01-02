const { Router } = require("express");
const UserController = require("../controllers/user-controller.js");
const UserService = require("../services/user-service.js");
const { authGuard } = require("../middlewares/auth-middleware.js");

const router = Router();
const userService = new UserService();
const userController = new UserController(userService);

router.post("/register", (req, res) => userController.register(req, res));

router.post("/login", (req, res) => userController.login(req, res));

router.post("/refresh-token", (req, res) =>
  userController.refreshToken(req, res)
);

router.get("/profile", authGuard(["user", "admin"]), (req, res) =>
  userController.getUserById(req, res)
);

router.get("/user-list", authGuard(["admin"]), (req, res) =>
  userController.getAllUser(req, res)
);

module.exports = router;

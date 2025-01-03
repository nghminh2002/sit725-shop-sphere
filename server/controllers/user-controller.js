class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  async register(req, res) {
    const { email, password, fullName } = req.body;

    try {
      const user = await this.userService.register(email, password, fullName);
      return res
        .status(201)
        .json({ message: "User registered successfully", data: user });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async login(req, res) {
    const { email, password } = req.body;

    try {
      const token = await this.userService.authenticate(
        email,
        password
      );
      return res.status(200).json({
        message: "Login successful",
        data: token,
      });
    } catch (error) {
      return res.status(401).json({ message: error.message });
    }
  }

  async refreshToken(req, res) {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token is required" });
    }

    try {
      const { accessToken } = await this.userService.refreshAccessToken(
        refreshToken
      );
      return res.status(200).json({
        message: "Token refreshed successfully",
        data: {
          accessToken,
        },
      });
    } catch (error) {
      return res.status(401).json({ message: error.message });
    }
  }

  // Get user by ID
  async getUserById(req, res) {
    const { user } = req;

    try {
      const existingUser = await this.userService.getUserById(user?.id);
      if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json({
        message: "success",
        data: {
          id: existingUser.id,
          email: existingUser.email,
          fullName: existingUser.fullName,
          role: existingUser.role,
        },
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  // Get all users
  async getAllUser(req, res) {
    try {
      const existingUsers = await this.userService.getAllUser();
      return res.status(200).json({
        message: "success",
        data: existingUsers.map((u) => {
          return {
            id: u.id,
            email: u.email,
            fullName: u.fullName,
            role: u.role,
          };
        }),
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = UserController;

const User = require("../models/user-model");

class UserRepository {
  async findById(userId) {
    return await User.findOne({ _id: userId }).exec();
  }

  async findByEmail(email) {
    return await User.findOne({ email }).exec();
  }

  async findOne(filter) {
    return await User.findOne(filter).exec();
  }

  async findAll(filter = {}) {
    return await User.find(filter).select("-password").exec();
  }

  async create(data) {
    const newUser = new User(data);
    return await newUser.save();
  }

  async update(filter, update) {
    return await User.findOneAndUpdate(filter, update, { new: true }).exec();
  }

  async delete(filter) {
    return await User.findOneAndDelete(filter).exec();
  }

  async updateRefreshToken(userId, refreshToken, expiresAt) {
    return await User.findByIdAndUpdate(
      userId,
      {
        refreshToken,
        refreshTokenExpiresAt: expiresAt,
      },
      { new: true }
    );
  }
}

module.exports = new UserRepository();

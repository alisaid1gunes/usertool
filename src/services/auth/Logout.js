/* eslint-disable no-underscore-dangle */

const { User, RefreshToken } = require('../../models');

const MongooseService = require('../Mongoose');

class Logout {
  constructor() {
    this.mongooseUser = new MongooseService(User);
    this.mongooseRefreshToken = new MongooseService(RefreshToken);
  }

  async LogoutUser(body) {
    const bodyIn = body;

    const { refreshToken } = bodyIn;

    try {
      await this.mongooseRefreshToken.delete({ token: refreshToken });

      return { success: true, message: 'user logged out' };
    } catch (err) {
      return { success: false, error: `logout error occurred${err}` };
    }
  }
}

module.exports = Logout;

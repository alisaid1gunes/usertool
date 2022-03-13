/* eslint-disable no-underscore-dangle */

const bcrypt = require('bcryptjs');

const { User } = require('../../models');

const MongooseService = require('../Mongoose');

const { generateToken } = require('../../utils');

const { RefreshToken } = require('../../models');

const { loginValidation } = require('../../validations/auth');
class Login {
  constructor() {
    this.mongooseUser = new MongooseService(User);
    this.mongooseRefreshToken = new MongooseService(RefreshToken);
  }

  async LoginUser(body) {
    try {
      const { error } = loginValidation(body);
      if (error) return { success: false, message: error.details[0].message };

      const user = await this.mongooseUser.get({ email: body.email });

      if (!user)
        return { message: 'email or password is wrong', success: false };

      const validPass = await bcrypt.compare(body.password, user.password);

      if (!validPass) return { message: 'Invalid password', success: false };

      const accessToken = generateToken(
        user._id,
        process.env.ACCESS_TOKEN_SECRET,
        '15d'
      );

      const refreshToken = generateToken(
        user._id,
        process.env.REFRESH_TOKEN_SECRET,
        '15d'
      );

      const refreshTokenDb = new RefreshToken({
        token: refreshToken,
      });
      const savedToken = await this.mongooseRefreshToken.save(refreshTokenDb);

      return {
        username: user.username,
        accessToken,
        refreshToken: savedToken.token,
        success: true,
        message: 'User successfully logged in',
      };
    } catch (err) {
      return { message: err, success: false };
    }
  }
}

module.exports = Login;

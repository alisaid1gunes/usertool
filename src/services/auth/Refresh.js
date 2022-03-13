/* eslint-disable no-underscore-dangle */

const jwt = require('jsonwebtoken');

const { User, RefreshToken } = require('../../models');

const MongooseService = require('../Mongoose');

const { generateToken } = require('../../utils/generateToken');

const { refreshValidation } = require('../../validations/auth');
class Refresh {
  constructor() {
    this.mongooseUser = new MongooseService(User);
    this.mongooseRefreshToken = new MongooseService(RefreshToken);
  }

  async Refresh(body) {
    const bodyIn = body;

    const { error } = refreshValidation(bodyIn);
    if (error) return { success: false, message: error.details[0].message };

    const refreshToken = await this.mongooseRefreshToken.get({
      token: bodyIn.refreshToken,
    });

    if (!refreshToken)
      return { success: false, message: 'refresh token could not find' };

    const userId = jwt.verify(
      refreshToken.token,
      process.env.REFRESH_TOKEN_SECRET
    );

    const accessToken = generateToken(
      userId,
      process.env.ACCESS_TOKEN_SECRET,
      '15d'
    );
    return { accessToken, success: true, message: 'refresh token successfuly created' };
  }
}

module.exports = Refresh;

/* eslint-disable consistent-return */
const { StatusCodes } = require('http-status-codes');

const ApiErrorService = require('../../services/ApiError');

const { Login } = require('../../services/auth');

const LoginService = new Login();

const login = async (req, res, next) => {
  try {
    const result = await LoginService.LoginUser(req.body);

    if (result.success) {
      return res
        .header('auth-token', result.accessToken)
        .status(StatusCodes.OK)
        .send({
          username: result.username,
          accessToken: result.accessToken,
          refreshToken: result.refreshToken,
          success: result.success,
          message: result.message,
        });
    }
    next(ApiErrorService.unauthorized(result.message));
  } catch (err) {
    next(ApiErrorService.unauthorized(`User could not log in.${err}`));
  }
};

module.exports = login;

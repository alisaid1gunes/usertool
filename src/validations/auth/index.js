const loginValidation = require('./login');

const registerValidation = require('./register');

const logoutValidation = require('./logout');

const refreshvalidation = require('./refresh');

module.exports = {
  registerValidation,
  loginValidation,
  logoutValidation,
  refreshvalidation,
};

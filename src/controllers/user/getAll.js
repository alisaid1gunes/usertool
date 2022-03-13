const { StatusCodes } = require('http-status-codes');

const { GetAll } = require('../../services/user');

const ApiErrorService = require('../../services/ApiError');

const UserService = new GetAll();

// eslint-disable-next-line consistent-return
const getAll = async (req, res, next) => {
  try {
    const result = await UserService.GetUser();
    if (result.success) return res.status(StatusCodes.OK).json(result);

    next(ApiErrorService.notFound(result.message));
  } catch (err) {
    next(ApiErrorService.notFound(`User could not be found. Error:${err}`));
  }
};

module.exports = getAll;

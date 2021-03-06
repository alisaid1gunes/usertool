const { StatusCodes } = require('http-status-codes');

const { Remove } = require('../../services/user');

const ApiErrorService = require('../../services/ApiError');

const UserService = new Remove();

// eslint-disable-next-line consistent-return
const remove = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await UserService.RemoveUser(id);
    if (result.success) return res.status(StatusCodes.OK).json(result);

    next(ApiErrorService.badRequest(result.message));
  } catch (err) {
    next(
      ApiErrorService.badRequest(
        `User could not remove. Request is wrong. Error:${err}`
      )
    );
  }
};

module.exports = remove;

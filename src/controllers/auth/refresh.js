/* eslint-disable consistent-return */
const { StatusCodes } = require('http-status-codes');

const ApiErrorService = require('../../services/ApiError');

const { Refresh } = require('../../services/auth');

const RefreshService = new Refresh();

const refresh = async (req, res, next) => {
  try {
    const result = await RefreshService.Refresh(req.body);

    if (result.success) return res.status(StatusCodes.OK).send(result);

    next(ApiErrorService.badRequest(result.message));
  } catch (err) {
    next(
      ApiErrorService.badRequest('Token could not refresh. Request is wrong')
    );
  }
};

module.exports = refresh;

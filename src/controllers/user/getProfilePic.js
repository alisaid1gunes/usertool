const { StatusCodes } = require('http-status-codes');

const ApiErrorService = require('../../services/ApiError');

// eslint-disable-next-line consistent-return
const getProfilePic = async (req, res, next) => {
  console.log(req.body);
  try {
    return res.status(StatusCodes.OK).sendFile(req.body.image, { root: './' });
  } catch (err) {
    next(
      ApiErrorService.notFound(
        `User could not found. Request is wrong. Error:${err}`
      )
    );
  }
};

module.exports = getProfilePic;

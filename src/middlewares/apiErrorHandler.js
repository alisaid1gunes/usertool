const ApiError = require('../services/ApiError');

function apiErrorHandler(err, req, res, next) {
  console.error(err);

  if (err instanceof ApiError) {
    res.status(err.code).send({success: false, message: err.message});
    return;
  }

  res.status(500).send({success: false, message: 'something went wrong'});
}
module.exports = apiErrorHandler;

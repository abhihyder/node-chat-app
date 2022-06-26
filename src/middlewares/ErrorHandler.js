const creatError = require("http-errors");

const errorHandler = {};

errorHandler.notFound = (req, res, next) => {
  next(creatError(404, "Your requested path not found!"));
};

errorHandler.defaultError = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.status).json(err);
};

module.exports = errorHandler;

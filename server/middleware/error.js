const createError = require("http-errors");

exports.notFound = (req, res, next) => {
  next(createError(404));
};

exports.errorHandler = (err, req, res, next) => {
  //  set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode);
  res.json({ error: err.message });
};

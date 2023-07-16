exports.mongooseError = (error, date, next) => {
  error.status = 400;
  next();
};

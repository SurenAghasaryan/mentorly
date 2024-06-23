function getInputValidator(validationSchema) {
  return async (req, res, next) => {
    const inputTypes = ["params", "query", "body", "headers"];
    let input;

    req.validated = {};

    for (let i = 0; i < inputTypes.length; i++) {
      const joiSchema = validationSchema[inputTypes[i]];
      if (!joiSchema) {
        continue;
      }

      input = req[inputTypes[i]];

      const result = joiSchema.validate(input, {
        abortEarly: false,
      });

      req.validated[inputTypes[i]] = result.value;

      if (result.error) {
        const { error } = result;
        if (error.details && error.details.length) {
          const errors = error.details.map((err) => ({
            message: err.message,
            details: { path: err.path },
          }));
          return res.status(400).send({
            message: "Validation error",
            errors: errors,
          });
        }
      }
    }

    return next();
  };
}

module.exports = getInputValidator;
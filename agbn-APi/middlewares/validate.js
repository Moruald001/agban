// middlewares/validate.js
const validate = (schema) => async (req, res, next) => {
  try {
    req.body = await schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    next();
  } catch (err) {
    res.status(400).json({
      message: "Données invalides",
      errors: err.errors,
    });
  }
};

module.exports = validate;

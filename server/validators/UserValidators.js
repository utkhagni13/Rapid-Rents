const Joi = require("joi");
const options = {
  abortEarly: false,
  allowUnknown: true,
  convert: true,
  stripUnknown: false,
};

module.exports.login = (data) => {
  const validator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().required(),
  });
  //
  const { error, value } = validator.validate(data, options);
  return { error, value };
};

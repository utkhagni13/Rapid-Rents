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

module.exports.register = (data) => {
    const validator = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        role: Joi.string().required(),
        gender: Joi.string(),
    });
    //
    const { error, value } = validator.validate(data, options);
    return { error, value };
};

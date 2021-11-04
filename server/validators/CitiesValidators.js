const Joi = require("joi");
const options = {
    abortEarly: false,
    allowUnknown: true,
    convert: true,
    stripUnknown: false,
};

module.exports.addCity = (data) => {
    const validator = Joi.object({
        state: Joi.string().required(),
        cityName: Joi.string().required(),
    });
    //
    const { error, value } = validator.validate(data, options);
    return { error, value };
};

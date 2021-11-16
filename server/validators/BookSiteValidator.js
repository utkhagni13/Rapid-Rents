const Joi = require("joi");
const options = {
    abortEarly: false,
    allowUnknown: true,
    convert: true,
    stripUnknown: false,
};

module.exports.bookSite = (data) => {
    const validator = Joi.object({
        userId:Joi.string().required(),
        siteid:Joi.string().required(),
        Amount:Joi.number().required(),
        Payment Details
        Status
        Date




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

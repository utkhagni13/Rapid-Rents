const Joi = require("joi");
const options = {
    abortEarly: false,
    allowUnknown: true,
    convert: true,
    stripUnknown: false,
};

module.exports.addBooking = (data) => {
    const validator = Joi.object({
        siteID: Joi.string().required(),
        bookingDate: Joi.string().required(),
        amount: Joi.number().required(),
        paymentDetails: Joi.object().required(),
    });
    //
    const { error, value } = validator.validate(data, options);
    return { error, value };
};

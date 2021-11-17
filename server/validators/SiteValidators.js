const Joi = require("joi");
const options = {
    abortEarly: false,
    allowUnknown: true,
    convert: true,
    stripUnknown: false,
};

module.exports.addNewSite = (data) => {
    const validator = Joi.object({
        name: Joi.string().required(),
        type: Joi.string().required(),
        location: Joi.string().required(),
        rent: Joi.number().required(),
        bhk: Joi.number().required(),
        rooms: Joi.number().required(),
        bathrooms: Joi.number().required(),
        kitchen: Joi.number().required(),
        measurements: Joi.array().items(Joi.number()).required(),
        description: Joi.string().required(),
        garageFacility: Joi.boolean().required(),
        imageArray: Joi.array().items(Joi.string()).required(),
        ownerData: Joi.object().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
    });
    //
    const { error, value } = validator.validate(data, options);
    return { error, value };
};
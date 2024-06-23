const Joi = require("joi");

module.exports.addToUser = {
    body: Joi.object().keys({
        data: Joi.object().keys({
            startDate: Joi.date().required(),
            endDate: Joi.date(),
            institutionTitle: Joi.string().required(),
        })
    }),
};

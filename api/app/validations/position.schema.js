const Joi = require("joi");

module.exports.attachPosition = {
    body: Joi.object().keys({
        data: Joi.object().keys({
            title: Joi.string().required(),
        })
    }),
};

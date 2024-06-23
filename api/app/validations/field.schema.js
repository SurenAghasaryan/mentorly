const Joi = require("joi");

module.exports.getFields = {
    query: Joi.object().keys({
        limit: Joi.number().integer(),
        offset: Joi.number().integer(),
        name: Joi.string(),
    }),
};

module.exports.attachFields = {
    body: Joi.object().keys({
        data: Joi.object().keys({
            fieldIds: Joi.array().items(
                Joi.number().integer().required(),
            ).required()
        })
    })
};

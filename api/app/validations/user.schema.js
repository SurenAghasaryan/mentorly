const Joi = require("joi");

module.exports.signin = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

module.exports.login = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

module.exports.updateProfile = {
  body: Joi.object().keys({
    data: Joi.object().keys({
      name: Joi.string().min(1).max(50),
      surname: Joi.string().min(1).max(50),
      type: Joi.string().valid('mentor', 'mentee'),
      description: Joi.string().min(1).max(500),
      about: Joi.string().min(1).max(500),
    })
  }),
};

module.exports.getUsers = {
  query: Joi.object().keys({
    limit: Joi.number().integer(),
    offset: Joi.number().integer(),
    sort: Joi.array().items(
      Joi.array()
        .length(2)
        .items(Joi.string().valid("name", "surname"), Joi.string().valid("ASC", "DESC"))
    ),
    name: Joi.string().min(1).max(50),
    surname: Joi.string().min(1).max(50),
    type: Joi.string().valid('mentor', 'mentee'),
  }),
};
const express = require('express');
const fieldController = require('../../controllers/v1/field.contorller');
const fieldSchema = require('../../validations/field.schema');
const validate = require('../../libs/validate.js');

const router = express.Router();

router.get("/fields", validate(fieldSchema.getFields), fieldController.getFields);

module.exports = router
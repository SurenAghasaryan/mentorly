const express = require('express');
const userController = require('../../controllers/v1/user.controller.js');
const userAuth = require('../../middleware/userAuth.js')
const userSchema = require('../../validations/user.schema.js');
const educationSchema = require('../../validations/educataion.schema.js');
const experienceSchema = require('../../validations/experience.schema.js');
const positionSchema = require('../../validations/position.schema.js');
const fieldSchema = require('../../validations/field.schema.js');
const validate = require('../../libs/validate.js');

const router = express.Router();

router.post("/users/signin", validate(userSchema.signin), userAuth.checkIsUserExist, userController.signin);
router.post("/users/login", validate(userSchema.login), userController.login);

router.get("/users/me", userAuth.checkAuth, userController.getSingleUser);
router.patch("/users/me", validate(userSchema.updateProfile), userAuth.checkAuth, userController.updateProfile);

router.get("/users", validate(userSchema.getUsers), userAuth.checkAuth, userController.getUsers);
router.get("/users/:id", userAuth.checkAuth, userController.getSingleUser);

router.post("/users/me/educations", validate(educationSchema.addToUser), userAuth.checkAuth, userController.addEducation);
router.delete("/users/me/educations/:id", userAuth.checkAuth, userController.deleteEducation);

router.post("/users/me/experiences", validate(experienceSchema.addToUser), userAuth.checkAuth, userController.addExperience);
router.delete("/users/me/experiences/:id", userAuth.checkAuth, userController.deleteExperience);

router.post("/users/me/position", validate(positionSchema.attachPosition), userAuth.checkAuth, userController.attachPosition);

router.put("/users/me/field", validate(fieldSchema.attachFields), userAuth.checkAuth, userController.attachFields);

module.exports = router
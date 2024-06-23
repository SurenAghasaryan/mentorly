const express = require("express");
const userRoutes = require("./v1/user.routes.js");
const fieldRoutes = require("./v1/field.routes.js")

const router = express.Router();

router.use('/v1', fieldRoutes);
router.use('/v1', userRoutes);

module.exports = router;
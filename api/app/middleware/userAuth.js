const db = require("../../models/index");
const jwt = require("jsonwebtoken");

const { User } = db;

const checkIsUserExist = async (req, res, next) => {
  try {
    const emailcheck = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (emailcheck) {
      return res.status(409).send("You already registered");
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

const checkAuth = async (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(409).send("Authentication failed");
  }

  try {
    const data = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: data.id,
    };
    next();
  } catch (err) {
    return res.status(403).send("Invalid Token");
  }
};

module.exports = { checkIsUserExist, checkAuth };

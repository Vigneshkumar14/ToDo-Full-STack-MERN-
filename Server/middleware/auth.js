const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  //   console.log("Cookie from middleware", req.cookies);
  const { token } = req.cookies;
  // console.log(token);
  //what if token is not there
  if (!token) {
    return res.status(403).json({
      success: false,
      message: "token is missing",
    });
  }

  //verify token
  try {
    const decodes = jwt.verify(token, process.env.SECRET);

    const user = await User.findById(decodes.id);
    user.password = undefined;
    user.email = undefined;
    user._id = undefined;

    // console.log(user);
    if (!user) {
      return res.status(403).json({
        success: false,
        message: "invalid token",
      });
    }
    // console.log("decode", decodes);
    req.user = decodes;
  } catch (error) {
    console.log(error);
    return res.status(403).json({
      success: false,
      message: "token is invalid",
    });
  }

  return next();
};

module.exports = auth;

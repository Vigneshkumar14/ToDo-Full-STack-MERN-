const mongoose = require("mongoose");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name) {
      return res.status(401).json({
        success: false,
        message: "Please enter the name",
      });
    }
    if (!email) {
      return res.status(401).json({
        success: false,
        message: "Please enter the email",
      });
    }

    if (!password) {
      return res.status(401).json({
        success: false,
        message: "Please enter the password",
      });
    }

    const userCheck = await User.findOne({ email });
    if (userCheck) {
      return res
        .status(401)
        .json({ success: false, message: "Email already registered" });
    }

    //encrypt the password
    const myEncyPassword = await bcrypt.hash(password, 10);

    //create a new entry in database
    const user = await User.create({
      name,
      email,
      password: myEncyPassword,
    });

    //create a token and send it to user
    const token = jwt.sign(
      {
        id: user._id,
        email,
      },
      process.env.SECRET,
      {
        expiresIn: process.env.JWT_EXPIRY,
      }
    );

    user.token = token;
    //don't want to send the password
    user.password = undefined;
    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRY * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
    res.status(201).cookie("token", token, options).json({
      success: true,
      token,
      user,
    });
  } catch (error) {
    // console.log(error);
    return res.status(403).json({
      success: false,
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.status(401).json({
        Success: false,
        message: "Enter the email to proceed",
      });
    }
    if (!password) {
      return res.status(401).json({
        Success: false,
        message: "Enter the password to proceed",
      });
    }

    const user = await User.findOne({ email });
    //if user does not exists - assignment

    if (!user) {
      return res.status(401).json({
        Success: false,
        message: "User does not exist Signup",
      });
    }
    //match the password
    let passwordm = await bcrypt.compare(password, user.password);
    if (!passwordm) {
      return res.status(401).json({
        Success: false,
        message: "Email or Password is wrong try again",
      });
    }
    if (user && passwordm) {
      const token = jwt.sign({ id: user._id, email }, process.env.SECRET, {
        expiresIn: process.env.JWT_EXPIRY,
      });

      user.password = undefined;
      user.token = token;

      const options = {
        expires: new Date(
          Date.now() + process.env.COOKIE_EXPIRY * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
      };

      return res.status(200).cookie("token", token, options).json({
        success: true,
        token,
        user,
      });
    }
  } catch (err) {
    console.log(err);
  }
};
const logout = (req, res) => {
  try {
    res.cookie("token", "", { maxAge: "1", httpOnly: true });
    req.user = "";
    // console.log("deleted", req.user);

    return res.status(200).json({
      success: true,
      message: "Logged out...",
    });
  } catch (err) {
    console.log(err);
    return res.status(403).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = { signUp, login, logout };

import bcryptjs from "bcryptjs";
import passport from "passport";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "All fields are required"));
  }
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });
  try {
    await newUser.save();
    res.json("New user created sucessfully");
  } catch (error) {
    // res.status(500).json({ message: error.message });
    next(error);
  }
};

const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === "" || password === "") {
    next(errorHandler(404, "All fields are required"));
  }
  const validUser = await User.findOne({ email });
  try {
    if (!validUser) {
      return next(errorHandler(404, "Invalid Credentials"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid Credentials"));
    }
    const { password: passcode, ...rest } = validUser._doc;
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

const googleLogin = passport.authenticate("google", {
  scope: ["profile", "email"],
});

const googleCallback = passport.authenticate("google", {
  failureRedirect: "/",
});

const googleRedirect = (req, res) => {
  res.redirect("http://localhost:3000/");
};

const userProfile = (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/api/auth/google");
  }
  res.send(`<h1>Hello, ${req.user.username}</h1>`);
};

export {
  signup,
  signin,
  googleLogin,
  googleCallback,
  googleRedirect,
  userProfile,
};

import { asyncError } from "../middlewares/error.js";
import { User } from "../models/user.js";
import ErrorHandler from "../utils/error.js";
import { cookieOptions, sendToken } from "../utils/features.js";

export const login = asyncError(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Incorreact    Email or Password", 400));
  }

  if (!password) return next(new ErrorHandler("Please Enter Passowrd", 400));

  // Handle Error
  const isMatched = await user.comparePassword(password);

  if (!isMatched) {
    return next(new ErrorHandler("Incorrect Email or Password", 400));
  }

  sendToken(user, res, `Welcome Back , ${user.name}`, 200);
});

export const signup = asyncError(async (req, res, next) => {
  const { name, email, password, address, city, country, pinCode } = req.body;

  let user = await User.findOne({ email });

  if (user) return next(new ErrorHandler("User Already Exist", 400));

  // Add Cloudinary Here
  user = await User.create({
    name,
    email,
    password,
    address,
    city,
    country,
    pinCode,
  });

  sendToken(user, res, `Registered Successfully`, 201);
});

export const getMyProfile = asyncError(async (req, res, next) => {
  const user = await User.findById(req.user);

  res.status(200).json({
    success: true,
    user,
  });
});

export const logOut = asyncError(async (req, res, next) => {
  res
    .cookie("token", "", {
      ...cookieOptions,
      expires: new Date(Date.now()),
    })
    .status(200)
    .json({
      success: true,
      message: "Logged Out Successfully",
    });
});

export const updateProfile = asyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  const { name, email, address, city, country, pinCode } = req.body;

  if (name) user.name = name;
  if (email) user.email = email;
  if (address) user.address = address;
  if (city) user.city = city;
  if (country) user.country = country;
  if (pinCode) user.pinCode = pinCode;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Profile Updated Successfully !!",
  });
});

export const changePassword = asyncError(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("+password");

  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword)
    return new ErrorHandler("Please Enter Old and New Password !!", 400);

  const isMatched = await user.comparePassword(oldPassword);

  if (isMatched) return next(new ErrorHandler("Incorrect Old Password", 500));

  user.password = newPassword;

  await user.save();

  res.status(200).json({
    success: true,
    message: "Password Changed Successfully !!",
  });
});

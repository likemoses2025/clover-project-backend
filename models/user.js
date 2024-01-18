import mongoose from "mongoose";
import validator from "validator";

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Name"],
  },

  email: {
    type: String,
    required: [true, "Please Enter Email"],
    unique: [true, "Email Already Exist"],
    validate: validator.isEmail,
  },

  password: {
    type: String,
    required: [true, "Please Enter Password"],
    minLength: [6, "Password muse be at least 6 characters long"],
    select: false,
  },

  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  pinCode: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },

  avartar: {
    public_id: String,
    url: String,
  },

  otp: Number,
  otp_expire: Date,
});

export const User = mongoose.model("User", schema);

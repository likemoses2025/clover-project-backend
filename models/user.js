import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

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

schema.pre("save", async function () {
  const temp = await bcrypt.hash(this.password, 10);
  this.password = temp;
});

schema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export const User = mongoose.model("User", schema);

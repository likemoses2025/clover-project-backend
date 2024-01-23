import express from "express";
import {
  changePassword,
  getMyProfile,
  logOut,
  login,
  signup,
  updateProfile,
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/login", login);

router.post("/signup", signup);

router.get("/me", isAuthenticated, getMyProfile);

router.get("/logout", isAuthenticated, logOut);

// Update Route
router.put("/updateprofile", isAuthenticated, updateProfile);
router.put("/changepassword", isAuthenticated, changePassword);

export default router;

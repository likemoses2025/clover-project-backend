import express from "express";
import { config } from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";

config({
  path: "./data/config.env",
});
export const app = express();

// Using Middleware
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res, next) => {
  res.send("Working");
});

// Importing Routers here
import user from "./routes/user.js";
app.use("/api/v1/user", user);

// using Error Middleware
app.use(errorMiddleware);

export const sendToken = (user, res, message, statusCode) => {
  const token = user.generateToken();

  res
    .status(statusCode)
    .cookie("token", token, {
      ...cookieOptions,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 90),
    })
    .json({
      success: true,
      message: message,
    });
};

export const cookieOptions = {
  // production true 이면 frontedn에서는 동작하지만 postman 에서는 작동하지 않는다.
  // production false 이면 postman에서는 동작하지만 frontend에서는 동작하지 않는다.
  secure: process.env.NODE_ENV === "Development" ? false : true,
  httpOnly: process.env.NODE_ENV === "Development" ? false : true,
  sameSite: process.env.NODE_ENV === "Development" ? false : "none",
};

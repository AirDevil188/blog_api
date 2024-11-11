const asyncHandler = require("express-async-handler");

const roleCheck = asyncHandler(async (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(401).json({ msg: "User is not an admin" });
  }
  next();
});

module.exports = { roleCheck };

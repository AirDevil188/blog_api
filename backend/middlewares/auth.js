const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

const roleCheck = asyncHandler(async (req, res, next) => {
  const comment = await db.getComment(req.params.id);
  if (comment) {
    if (req.user.user === comment.userId) {
      return next();
    }
  }
  if (req.user.role !== "admin") {
    return res.status(401).json({ msg: "User is not an admin" });
  }
  return next();
});

module.exports = { roleCheck };

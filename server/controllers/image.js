const asyncHandler = require("express-async-handler");

const uploadFile = require("../utils/s3");

// @route POST /users
// @desc Search for users
// @access Private
exports.uploadImage = asyncHandler(async (req, res) => {
  const file = req.file;
  const result = await uploadFile(file);
  res.status(200).json({
    success: {
      image: result,
    },
  });
});

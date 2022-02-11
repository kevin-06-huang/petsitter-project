const asyncHandler = require("express-async-handler");

const uploadFile = require("../utils/s3");

// @route POST /image/upload
// @desc Upload image(s)
// @access Private
exports.uploadImage = asyncHandler(async (req, res) => {
  const file = req.file;
  const result = await uploadFile(file);
  res.status(200).json({
    success: {
      imagePath: result.Location,
    },
  });
});

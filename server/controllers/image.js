const asyncHandler = require("express-async-handler");

const uploadFile = require("../utils/s3");

// @route POST /users
// @desc Search for users
// @access Private
exports.uploadImage = asyncHandler(async (req, res) => {
  const file = req.file;
  console.log(typeof(req.body));
  const result = await uploadFile(file);
  console.log(result);
  const description = req.body.description;
  res.status(200).json({
    success: {
      image: result,
    },
  });
});

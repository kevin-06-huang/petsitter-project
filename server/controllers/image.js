const asyncHandler = require("express-async-handler");

const { uploadFile, getFileStream, deleteFile } = require("../utils/s3");

// @route POST /image/upload
// @desc Upload image(s)
// @access Private
exports.uploadImage = asyncHandler(async (req, res) => {
  const file = req.file;
  const result = await uploadFile(file);
  res.status(200).json({
    success: {
      image: result.Key,
    },
  });
});

exports.downloadImage = asyncHandler(async (req, res) => {
  console.log(req.params)
  const key = req.params.key
  const readStream = getFileStream(key)

  readStream.pipe(res)
});

exports.deleteImage = asyncHandler(async (req, res) => {
  console.log(req.params)
  const key = req.params.key
  deleteFile(key)
  res.status(202);
});

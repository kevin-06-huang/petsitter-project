const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
var multer = require("multer")
var upload = multer({ dest: './upload' })
const {
  uploadImage, downloadImage, deleteImage
} = require('../controllers/image');

router.route('/upload').post(protect, upload.single('image'), uploadImage);
router.route('/:key').get(protect, downloadImage);
router.route('/:key').delete(protect, deleteImage);

module.exports = router;
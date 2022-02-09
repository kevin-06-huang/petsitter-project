const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
var multer = require("multer")
var upload = multer({ dest: './upload' })
const {
  uploadImage,
} = require('../controllers/image');

router.route('/upload').post(protect, upload.single('image'), uploadImage);

module.exports = router;
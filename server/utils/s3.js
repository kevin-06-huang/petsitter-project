const S3 = require('aws-sdk/clients/s3');
const fs = require('fs');
const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
});

const uploadFile = (file) => {
  const fileStream = fs.createReadStream(file.path)

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename
  }

  return s3.upload(uploadParams).promise()
};

const getFileStream = (fileKey) => {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName
  }

  return s3.getObject(downloadParams).createReadStream()
};

const deleteFile = (fileKey) => {
  const deleteParams = {
    Key: fileKey,
    Bucket: bucketName
  }

  s3.deleteObject(deleteParams, function(error) {
    if (error) {
      console.log(error, error.stack)
    } else {
      console.log(`File ${fileKey} has been deleted.`)
    };
  });
};

module.exports = { uploadFile, getFileStream, deleteFile };
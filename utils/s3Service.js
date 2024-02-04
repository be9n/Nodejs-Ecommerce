const { S3 } = require("aws-sdk");
const uuid = require("uuid").v4;

const uploadFiles = async (files) => {
  return Promise.all(files.map((file) => uploadFile(file)));
};

const deleteFiles = async (fileNames) => {
  return Promise.all(fileNames.map((fileName) => deleteFile(fileName)));
};

const uploadFile = async (file) => {
  const s3 = new S3();

  const param = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `uploads/${uuid()}-${file.originalname}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  return s3.upload(param).promise();
};

const deleteFile = async (fileName) => {
  const s3 = new S3();

  const param = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: fileName,
  };

  return s3.deleteObject(param).promise();
};

module.exports = {
  uploadFiles,
  deleteFiles,
  deleteFile,
  uploadFile,
};

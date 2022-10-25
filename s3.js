const aws = require("aws-sdk")
const fs = require("fs")

require("dotenv").config()

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_ACCESS_SECRET

const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey
})

async function uploadFile(file) {
    console.log(region)
    // Read content from the file
    console.log("Start upload !")
    const fileContent = fs.readFileSync(file.path);

    // Setting up S3 upload parameters
    const params = {
        Bucket: bucketName,
        Key: file.filename, // File name you want to save as in S3
        Body: fileContent
    };

    // Uploading files to the bucket
    return s3.upload(params).promise()
};

async function deleteFile(key) {
    console.log("start deletion process")

    // Setting up S3 upload parameters
    const params = {
        Bucket: bucketName,
        Key: key // File name you want to delete from s3
    };

    return s3.deleteObject(params).promise();
};

module.exports = {uploadFile, deleteFile}
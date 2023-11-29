const fs = require("fs");
const AWS = require("aws-sdk");

const { v4: uuidv4 } = require("uuid");
const { endpoint_url, access_key, secret_key, bucket } =
  require("../config/keys").s3;

exports.upload = (path, originalFileName, modelName, callback, keepPath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, async function (err, data) {
      try {
        if (err) throw err;
        const name = originalFileName.split(".");
        const ext = name[name.length - 1];
        name.pop();
        const tempFileName = name.toString();
        const fileName = tempFileName.replace(/,/g, "");

        const s3 = new AWS.S3({
          endpoint: endpoint_url,
          accessKeyId: access_key,
          secretAccessKey: secret_key,
        });
        const params = {
          Bucket: bucket,
          Key: modelName + "/" + fileName + "-" + uuidv4() + "." + ext,
          Body: data,
          ACL: "public-read",
        };
        const uploadData = await s3.upload(params).promise();
        if (!keepPath) {
          fs.unlink(path, function (err) {
            if (err) {
              console.error(err);
            }
          });
        }
        if (callback) callback();
        return resolve(uploadData);
      } catch (error) {
        fs.unlink(path, function (err) {
          if (err) {
            console.error(err);
          }
        });
        reject(error);
        return error;
      }
    });
  });
};

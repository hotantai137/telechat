import AWS from 'aws-sdk';
// import jwt from 'jsonwebtoken';

// const AWS_S3_ACCESS_KEY_ID = jwt.verify(process.env.REACT_APP_AWS_S3_ACCESS_KEY_ID_JWT, process.env.REACT_APP_SECRET_KEY);
const s3 = new AWS.S3({
    // accessKeyId: AWS_S3_ACCESS_KEY_ID.accessKeyID,
    accessKeyId: process.env.REACT_APP_AWS_S3_ACCESS_KEY_ID_1 + process.env.REACT_APP_AWS_S3_ACCESS_KEY_ID_2,
    secretAccessKey: process.env.REACT_APP_AWS_S3_SECRET_ACCESS_KEY,
    region: process.env.REACT_APP_AWS_S3_REGION
  });

  export default{
    uploadImage: async (fileName, blob) => {
        const params = {
            Bucket: process.env.REACT_APP_AWS_S3_BUCKET_NAME,
            Key: fileName,
            Body: blob,
            ACL:'public-read'
          }
        const uploadedImage = await s3.upload(params).promise();
        console.log(uploadedImage);
        // console.log(uploadedImage.Location);
        return uploadedImage;
    }
  }


import AWS from 'aws-sdk';

const s3 = new AWS.S3({
    accessKeyId: process.env.REACT_APP_AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_S3_SECRET_ACCESS_KEY,
    region: process.env.REACT_APP_AWS_AWS_S3_REGION
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


import AWS from 'aws-sdk';
import fs from 'fs';

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();
const bucket: string = process.env.AWS_BUCKET_NAME || "aid-crowdsource";

const s3Upload = async (filePath: string, fileName: string, contentType: string) => {
    const params: AWS.S3.PutObjectRequest = {
        Bucket: bucket,
        Key: 'projects/' + fileName,
        Body: fs.createReadStream(filePath),
        ACL: 'public-read',
        ContentType: contentType,
    };
    try {
        const data = await s3.upload(params).promise();
        return data.Location;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export default s3Upload;
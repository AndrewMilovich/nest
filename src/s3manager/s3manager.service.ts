import { Injectable, UploadedFile } from "@nestjs/common";
import * as AWS from "aws-sdk";
import { ManagedUpload } from "aws-sdk/clients/s3";

@Injectable()
export class S3managerService {
  Bucket;
  constructor() {
    this.Bucket = new AWS.S3({
      region: process.env.REGION,
      accessKeyId: process.env.ACCESS_KEY_ID,
      secretAccessKey: process.env.SECRET_ACCESS_ID,
    });
  }
  async uploadFile(@UploadedFile() file): Promise<ManagedUpload.SendData> {
    try {
      const filePath = this.filePath(file.originalname);
      return this.Bucket.upload({
        Bucket: process.env.S3_NAME_Bucket,
        Body: file.buffer,
        Key: filePath,
        ContentType: file.mimetype,
        ACL: 'public-read',
      }).promise();
    } catch (e) {
      console.log(e);
    }
  }

  private  filePath(fileName: string): string {
    try {
      const randomName = Array(32)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
      return `avatar/${randomName}${fileName}`;
    } catch (e) {
      console.log(e);
    }
  }
}

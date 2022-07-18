import AWS, { AWSError } from "aws-sdk";
import { Progress } from "aws-sdk/lib/request";

const REGION = "eu-north-1";
const S3_BUCKET = "lorantest";
const config = {
  bucketName: S3_BUCKET,
  album: "images",
  region: REGION,
  accessKeyId: "AKIARRKXDCQFRVN25FOG",
  secretAccessKey: "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"
};

const clientBucket = new AWS.S3(config);

export const uploadFile = ({
  file,
  onUploadProgress,
  onFinishUpload
}: {
  file: File;
  onUploadProgress: (event: Progress) => void;
  onFinishUpload: (event) => void;
}) => {
  const params = {
    ACL: "public-read",
    Body: file,
    Bucket: `${S3_BUCKET}/images`,
    Key: file.name
  };
  clientBucket
    .putObject(params)
    .onAsync("httpUploadProgress", onUploadProgress)
    .onAsync("httpDone", onFinishUpload)
    .send((error: AWSError) => {
      if (error) console.error(error);
    });
};

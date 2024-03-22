const AWS = require('aws-sdk');
const fs = require('fs');

// Set AWS credentials (if not set via environment variables)
const credentials = {
  accessKeyId: 'AKIAVMKLFLXFVOHCPBFF',
  secretAccessKey: '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'
};
AWS.config.update({ credentials });

// Create an S3 instance
const s3 = new AWS.S3();

// Define parameters for retrieving the file
const params = {
  Bucket: 'uoft2024questionbank',
  Key: '2024winterECE110Q1a.png' // Path to the file in the bucket
};

// Retrieve the file from S3
s3.getObject(params, (err, data) => {
  if (err) {
    console.error('Error retrieving file:', err);
  } else {
    // Write the file to the local filesystem
    fs.writeFile('downloaded_file.txt', data.Body, (err) => {
      if (err) {
        console.error('Error writing file:', err);
      } else {
        console.log('File downloaded successfully.');
      }
    });
  }
});

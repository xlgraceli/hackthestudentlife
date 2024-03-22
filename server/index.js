// Retrieve the file from S3
const AWS = require('aws-sdk');
const fs = require('fs');

// Create an S3 instance
const s3 = new AWS.S3();


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
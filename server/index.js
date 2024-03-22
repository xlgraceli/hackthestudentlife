// const express = require('express');
// const AWS = require('aws-sdk');
// const fs = require('fs');

// // Create instances
// const app = express();
// const s3 = new AWS.S3();

// const credentials = {
//     accessKeyId: 'AKIAVMKLFLXFVOHCPBFF',
//     secretAccessKey: '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'
//   };

// app.get('/get-image', (req, res) => {
//     // Define parameters for retrieving the file from S3
//     const params = {
//       Bucket: 'uoft2024questionbank',
//       Key: '2024winterECE110Q1a.png' // Path to the image file in the bucket
//     };
  
//     // Retrieve the file from S3
//     s3.getObject(params, (err, data) => {
//       if (err) {
//         console.error('Error retrieving file from S3:', err);
//         res.status(500).send('Error retrieving image from S3');
//       } else {
//         // Send the image data as the response
//         res.send(data.Body);
//       }
//     });
// });

// app.use(express.static('public'));

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
const express = require('express');
const AWS = require('aws-sdk');
const fs = require('fs');

// Create instances
const app = express();
const s3 = new AWS.S3();

// Set AWS credentials (using environment variables or a credentials file is recommended)
AWS.config.update({
  accessKeyId: 'AKIAVMKLFLXFVOHCPBFF',
  secretAccessKey: '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',
  region: us-east-1
});

app.get('/get-image', (req, res) => {
  // Define parameters for retrieving the file from S3
  const params = {
    Bucket: 'uoft2024questionbank',
    Key: '2024winterECE110Q1a.png' // Path to the image file in the bucket
  };

  // Retrieve the file from S3
  s3.getObject(params, (err, data) => {
    if (err) {
      console.error('Error retrieving file from S3:', err);
      res.status(500).send('Error retrieving image from S3');
    } else {
      // Convert the image data to a base64-encoded string
      const imageData = Buffer.from(data.Body).toString('base64');
      // Set the appropriate content type in the response headers
      res.setHeader('Content-Type', 'image/png');
      // Send the base64-encoded image data as the response
      res.send(imageData);
    }
  });
});

// Serve static files from the 'public' directory
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

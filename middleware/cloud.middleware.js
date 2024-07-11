const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');


let loading = 0;
module.exports.cloud = (req, res, next) => {
  let setLoading = 0;
  if (req.file) {
    let streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream((error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        });

        let loadedBytes = 0;
        let totalBytes = req.file.buffer.length;

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    async function upload(req) {
      let result = await streamUpload(req);
      console.log('upload ~ result:', result);
      if (result.secure_url) {
        req.body[req.file.fieldname] = result.secure_url;
      }
      next();
    }

    upload(req);
  } else {
    next();
  }
};

module.exports.drive = async (req, res, next) => {
  if (req.file) {
    const file = req.file;
    const data = file.buffer.toString('base64');

    const postData = {
      name: file.originalname,
      type: file.mimetype,
      data: data,
    };

    const postFile = async (postData) => {
      try {
        const response = await fetch(
          'https://script.google.com/macros/s/AKfycbyo6tpZXac7QizufOYHDo8Xf-oOyWcOWH48ZerThvXEjSkW-1jDIswzvleZ6nXGd9ab/exec',
          {
            method: 'POST',
            body: JSON.stringify(postData),
            headers: { 'Content-Type': 'application/json' },
          }
        );
        const responseData = await response.json();
        res.json(responseData);
        next();
      } catch (error) {
        console.log(error);
        next(error);
      }
    };

    postFile(postData);
  } else {
    next();
  }
};
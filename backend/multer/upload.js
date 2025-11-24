let multer  = require('multer');
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images');
  },
  filename: (req, file, cb) => {
    let filetype = '';
    if(file.mimetype === 'image/gif') {
      filetype = 'gif';
    } else if(file.mimetype === 'image/png') {
      filetype = 'png';
    } else if(file.mimetype === 'image/jpeg') {
      filetype = 'jpg';
    }
    cb(null, 'image-' + Date.now() + '.' + filetype);
  }
});

let upload = multer({storage: storage});

module.exports = upload;
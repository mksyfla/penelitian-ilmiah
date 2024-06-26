const fs = require('fs');
const path = require('path');
const Multer = require('multer');
const InvariantError = require('../exceptions/InvariantError');

const storage = Multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(path.join(__dirname, '../../public'))) {
      fs.mkdirSync(path.join(__dirname, '../../public'));
    }

    cb(null, 'public');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const multer = Multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new InvariantError('Invalid file type'));
    }
  },
});

module.exports = multer;

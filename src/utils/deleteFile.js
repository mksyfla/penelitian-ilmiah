const fs = require('fs');
const path = require('path');

function deleteFile(file) {
  if (file !== 'public/blank-profile.png') {
    fs.rm(path.join(__dirname, '../../') + file, (error) => {
      if (error) {
        throw new Error(error.message);
      }
    });
  }
}

module.exports = deleteFile;

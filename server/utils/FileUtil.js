const fs = require('fs');

const fileUtil = {
  // Function to read a file from the file system
  readFile(filePath) {
    return fs.readFileSync(filePath, 'utf8');
  },

  // Function to write a file to the file system
  writeFile(filePath, data) {
    fs.writeFileSync(filePath, data);
  },

  // Function to delete a file from the file system
  deleteFile(filePath) {
    fs.unlinkSync(filePath);
  },

  // Function to check if a file exists
  fileExists(filePath) {
    return fs.existsSync(filePath);
  },

  // Function to get the file extension
  getFileExtension(fileName) {
    return fileName.split('.').pop();
  },

  // Function to get the file name
  getFileName(filePath) {
    return filePath.split('/').pop();
  },

  // Function to get the file size
  getFileSize(filePath) {
    const stats = fs.statSync(filePath);
    return stats.size;
  },

  // Function to get the file type
  getFileType(filePath) {
    const stats = fs.statSync(filePath);
    return stats.isFile() ? 'file' : 'directory';
  },

  // Function to get the file permissions
  getFilePermissions(filePath) {
    const stats = fs.statSync(filePath);
    return stats.mode;
  },

  // Function to get the file creation date
  getFileCreationDate(filePath) {
    const stats = fs.statSync(filePath);
    return stats.birthtime;
  },
};

module.exports = fileUtil;

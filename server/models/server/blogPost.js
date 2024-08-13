const markdownService = require('../../services/MarkdownService');

class BlogPost {
  constructor(fileName, subdirectory = null, parentDirectory = 'blogs/') {
    this.service = new markdownService();
    this.fileName = fileName;
    this.parentDirectory = parentDirectory;
    this.subdirectory = subdirectory;

    this.original = this.service.getFile(fileName, subdirectory);

    this.contentAsHTML = this.service.convertToHTML(this.original);
    this.contentAsText = this.service.convertToText(this.original);
    this.metaData = this.service.getMetaData(this.original);
  }

  read() {
    return {
      title: this.fileName,
      parentDirectory: this.parentDirectory,
      subdirectory: this.subdirectory,
      original: this.original,
      contentAsHTML: this.contentAsHTML,
      contentAsText: this.contentAsText,
      metaData: this.metaData,
    };
  }
}

module.exports = BlogPost;

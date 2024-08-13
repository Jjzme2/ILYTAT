const BlogPost = require('../../models/server/blogPost');

class MarkdownController {
  constructor() {}

  // * Gets a file by name and an optional directory. Returns a new BlogPost object.
  getFile(fileName, directory = null) {
    let file;
    try {
      if (directory !== null) {
        file = new BlogPost(fileName, directory);
      } else {
        file = new BlogPost(fileName);
      }

      if (!file) {
        throw new Error('The document could not be found');
      }
    } catch (error) {
      console.error(error);
    }
    return file;
  }

  // ! This and below are all old code. I will need to ensure these are still relevant.
  async getMetaFromMarkdown(fileName, directory = null) {
    let file = this.getFile(fileName, directory);
    let metaData;
    try {
      metaData = this.service.getMetaData(file);

      if (!metaData) {
        throw new Error('The document could not be converted to HTML');
      }
    } catch (error) {
      console.error(error);
    }
    return metaData;
  }

  // Functions here:
  async getDocumentAsHTML(fileName, directory = null) {
    let file = this.getFile(fileName, directory);

    // If the file contains the '---' at the top, for metaData, remove it.
    const regexPattern = /^---\n([\s\S]*?)\n---/m;

    const content = file.replace(regexPattern, '');

    const html = this.service.convertToHTML(content);

    if (!html) {
      throw new Error('The document could not be converted to HTML');
    }
    return html;
  }
  catch(error) {
    throw new Error('An error occurred while fetching the document', error);
  }
}

module.exports = MarkdownController;

const { MarkdownUtil, FileUtil } = require('../utils');

class MarkdownService {
	constructor() {
		this.markdownUtility = new MarkdownUtil();
	}

	// Functions here:
	getMetaData(markdown) {
		return this.markdownUtility.getMetaDataFromMarkdown(markdown);
	}

	// Function to convert markdown to HTML
	convertToHTML(markdown) {
		return this.markdownUtility.markdownToHTML(markdown);
	}

	// Function to convert markdown to plain text
	convertToText(markdown) {
		return this.markdownUtility.markdownToText(markdown);
	}

	/**
	 * Function to get a file from the blogs directory
	 * @param {string} fileName - The name of the file to get
	 * @param {string} subdirectory - The subdirectory to look in, if any
	 * @param {string} fileType - The type of file to get (default: "md")
	 * @returns {string} - The file content
	 */
	getFile(fileName, subdirectory = '', fileType = 'md') {
		// Construct the file path with proper handling of the subdirectory
		const filePath = `blogs${subdirectory ? `/${subdirectory}` : ''}/${fileName}.${fileType}`;

		// Check if the file exists before attempting to read
		if (!FileUtil.fileExists(filePath)) {
			throw new Error(`File ${filePath} does not exist`);
		}

		// Read and return the file content
		return FileUtil.readFile(filePath);
	}
}

module.exports = MarkdownService;

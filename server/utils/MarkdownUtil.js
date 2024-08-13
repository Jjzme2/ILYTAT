const MarkdownIt = require('markdown-it');
const hljs = require('highlight.js');

class MarkdownUtil {
	constructor() {
		this.defaultMd = new MarkdownIt({
			html: true,
			breaks: true,
			// linkify: true,
			typographer: true,
			highlight: function (str, lang) {
				if (lang && hljs.getLanguage(lang)) {
					try {
						return hljs.highlight(str, { language: lang }).value;
					} catch (e) {
						throw new Error('Error in highlighting code block: ' + e.message);
					}
				}
				return ''; // use external default escaping
			},
		});
	}

	// Function to create a metadata object from a metadata block
	CreateMetaDataFromMetaBlock(metaBlockMatch) {
		const lines = metaBlockMatch.split('\n').filter((line) => line !== '---');
		let metaObject = {};
		lines.forEach((line) => {
			if (line === '---') {
				lines.splice(lines.indexOf(line), 1);
			}
			const [key, ...value] = line.split(':');
			if (key && value) {
				metaObject[key.trim()] = value.join(':').trim();
			}
		});
		return metaObject;
	}

	removeMetaDataFromMarkdown(markdown) {
		const content = markdown;

		try {
			if (!content || content.trim() === '')
				throw new Error('No content found in the document');

			// Get the YAML data from between the two lines of three dashes
			const regexPattern = /^---\n([\s\S]*?)\n---/m;

			let metaBlockMatch = 'None found.';
			if (content.match(regexPattern)) {
				metaBlockMatch = content.match(regexPattern)[0];
			}

			if (metaBlockMatch === 'None found.')
				//   throw new Error("No metadata block found in the document");
				return content;

			const newContent = content.replace(metaBlockMatch, '');

			return newContent;
		} catch (err) {
			throw new Error('Error in removeMetaDataFromMarkdown: ' + err.message);
		}
	}

	getMetaDataFromMarkdown(markdown) {
		const content = markdown;

		if (!content || content.trim() === '')
			throw new Error('No content found in the document');

		// Get the YAML data from between the two lines of three dashes
		const regexPattern = /^---\n([\s\S]*?)\n---/m;
		const metaBlockMatch =
			(content.match(regexPattern) && content.match(regexPattern)[0]) ||
			'None found.';

		if (metaBlockMatch === 'None found.') {
			const errorMessage = {
				message: 'No metadata block found in the document',
				content: content,
			};
			console.warn(JSON.stringify(errorMessage));
			return;
		}

		const metaObject = this.CreateMetaDataFromMetaBlock(metaBlockMatch);

		return metaObject;
	}

	// Function to convert markdown to HTML
	markdownToHTML(markdown) {
		if (!this.defaultMd) {
			throw new Error('MarkdownIt instance not initialized');
		}

		const content = this.removeMetaDataFromMarkdown(markdown);
		return this.defaultMd.render(content);
	}

	// Function to convert markdown to plain text
	markdownToText(markdown) {
		const content = this.removeMetaDataFromMarkdown(markdown);
		return content;
	}
}

module.exports = MarkdownUtil;

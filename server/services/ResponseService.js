class ResponseService {
	constructor() {
		this.res = null;
	}

	// * Resets the response object.
	resetResponse() {
		this.res = null;
	}

	// * Sets the response object.
	setResponse(res) {
		this.res = res;
	}

	// * Sends a message to the client. With an optional success flag.
	sendMessage(messages, success = true) {
		this.validateResponse();

		if (!Array.isArray(messages)) {
			messages = [messages];
		}

		messages = messages.map((message) => {
			if (typeof message === 'string') {
				return message;
			}
			return message;
		});

		const status = success ? 200 : 400;
		this.res.status(status).json({
			success,
			messages,
		});

		this.resetResponse();
	}

	// * Sends a data payload to the client.
	sendData(data) {
		this.validateResponse();

		this.res.status(200).json({
			success: true,
			payload: data,
		});

		this.resetResponse();
	}

	// * Sends an error to the client.
	sendError(error) {
		this.validateResponse();

		this.res.status(400).json({
			success: false,
			timestamp: new Date().toISOString(),
			message: error.message,
			stack: error.stack,
			error: error,
		});

		this.resetResponse();
	}

	// * Private method to validate the response object. This is not meant to be called directly.
	validateResponse() {
		if (!this.res) {
			throw new Error(
				'Response object not set. Please set the response object using ( setResponse(res) ) before sending a response.'
			);
		}
	}
}

module.exports = ResponseService;

const express = require('express');
const router = express.Router();
const MarkdownController = require('../controllers/server/MarkdownController');
const { ResponseService } = require('../services');

const controller = new MarkdownController();
const responder = new ResponseService();

/*
--------------------------------------------------------------
					Common Blog Routes
--------------------------------------------------------------
*/

router.get('/', async (req, res) => {
	responder.setResponse(res);
	responder.sendData({
		message: 'Welcome to the blog API',
		routes: [
			{
				about: 'Send a message and show the routes available',
				path: '/blog/',
			},
			{
				about: 'Get blogs within the tech subdirectory',
				path: '/blog/tech/:fileName',
			},
		],
	});
});

router.get('/tech/:fileName', async (req, res) => {
	responder.setResponse(res);
	const post = controller.getFile(req.params.fileName, 'tech');
	responder.sendData(post.read());
});

module.exports = router;

// Import the express module
const express = require('express');

// Router
const { applyRoutes } = require('./routes/_routes');

// Create an instance of express
const app = express();

// Define a port to listen on
const PORT = process.env.PORT || 3000;

applyRoutes(app);

// Start the server and listen on the defined port
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

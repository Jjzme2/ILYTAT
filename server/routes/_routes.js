// const { auth, requiresAuth } = require("express-openid-connect");
// require("dotenv").config();

// const config = {
// 	authRequired: false,
// 	auth0Logout: true,
// 	secret: process.env.AUTH0_SECRET,
// 	baseURL: process.env.AUTH0_BASE_URL,
// 	clientID: process.env.AUTH0_CLIENT_ID,
// 	issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
// };

// * Import Routes
const mainRoutes = require('./mainRoutes');
const blogRoutes = require('./blogRoutes');

// * Apply Routes -- This is where you define your routes
const applyRoutes = (app) => {
	// - Kept to demonstrate how auth would be used
	// app.use(auth(config));

	app.use('/', mainRoutes);
	app.use('/blog', blogRoutes);

	// - Kept to demonstrate how require auth would be used
	// app.use("/dev/wiki", requiresAuth(), wikiRoutes);
};

module.exports = { applyRoutes };

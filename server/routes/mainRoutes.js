const express = require('express');
const router = express.Router();
// const passport = require("../config/passport");
// const responder = require("../utils/responder");

const { ResponseService } = require('../services');

const { TransactionService } = require('../services/API');

const responder = new ResponseService();

// Home Route
router.get('/', async (req, res) => {
  responder.setResponse(res);

  // !Create a Controller for transactions and other services. This way we can keep the routes clean. This is just a sample.
  const sample = await new TransactionService().getExpenses();

  const data = {
    message: 'Welcome to the ILYTAT Server.',
    user: req.user || null,
    sampleData: sample || null,
  };
  responder.sendData(data);
});

module.exports = router;

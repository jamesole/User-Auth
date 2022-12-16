const express = require('express');
const router = express.Router();
const getPrivateData = require('../controller/private');

//to protect this route, just import the auth protect middleware
const { protect } = require('../middleware/auth');

//we need to pass JSON WEB TOKEN, so if we don't it will never call next, allowing us to move to the next page. In order to get access to this route, we need to login and get a token. The token you get from logging in, then must be added to auth header (bearer)

router.route('/').get(protect, getPrivateData)


module.exports = router;

const {register, login, getUser} = require('../controller/auth');

const express = require('express');
const router = express.Router();

//-----------------ROUTES----------------------//

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/user').post(getUser);


module.exports = router;

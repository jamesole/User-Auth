const express = require('express');
const router = express.Router();

const {createUser, getUsers, loginUser} = require('../controller/userRoutes');
const {protect} = require('../middleware/authMiddleware');


router.post('/register', createUser)
router.post('/login', loginUser)
router.get('/me', protect, getUsers);

module.exports = router;

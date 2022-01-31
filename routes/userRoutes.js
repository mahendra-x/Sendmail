const express = require('express');
const userController = require('../Controller/userController');
const router = express.Router();

router.post('/login', userController.login);

router.post('/register', userController.register);

router.get('/webinar', userController.webinar); 

module.exports = router;
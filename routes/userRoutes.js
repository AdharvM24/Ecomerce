const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController/userController');

router.get('/users', userController.signup);
router.post('/users', userController.login);

module.exports = router;

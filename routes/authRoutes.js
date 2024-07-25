const express = require('express');
const userRouter = express.Router();
const authController = require('../controllers/userController/userController');

userRouter.post('/signup', authController.signup);
userRouter.post('/login', authController.login);

module.exports = userRouter;

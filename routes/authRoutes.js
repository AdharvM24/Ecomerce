const express = require('express');
const userRouter = express.Router();
const authController = require('../controllers/userController/userController');
const authenticateJWT = require('../middleware/auth');

userRouter.post('/signup', authController.signup);
userRouter.post('/login', authController.login);
userRouter.get('/products', authenticateJWT, authController.getProducts);
module.exports = userRouter;

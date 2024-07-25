const express = require('express');
const adminRouter = express.Router();
const authController = require('../controllers/adminController/adminLoginController');
const productController = require('../controllers/adminController/addProducts');
const upload = require('../middleware/upload');

// adminRouter.post('/signup', authController.signup);
adminRouter.post('/login', authController.login);
adminRouter.post('/products', upload.single('image'), productController.createProduct);

module.exports = adminRouter;

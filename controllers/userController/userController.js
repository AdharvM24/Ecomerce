const User = require("../../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Product = require('../../models/Products');
require("dotenv").config();
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();

    // const token = jwt.sign({ id: user._id }, { expiresIn: '1h' });
    res
      .status(201)
      .json({ success: true, message: "Registration completed successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
        error_code: 1308,
        data: {},
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    // res.status(200).json({ user, token });
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: {
        user: {
          name: user.name,
          email: user.email,
        },
      },
      token: token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getProducts = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();

    // const token = jwt.sign({ id: user._id }, { expiresIn: '1h' });
    res
      .status(201)
      .json({ success: true, message: "Registration completed successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products from the database
    res.status(200).json({
      success: true,
      message: 'Products retrieved successfully',
      data: products,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
      error_code: 1500,
      data: {},
    });
  }
};

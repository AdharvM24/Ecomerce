const User = require("../../models/adminModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

exports.login = async (req, res) => {
  try {
    console.log("admin datas");
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
    res.status(200).json({
      success: true,
      message: "Admin logged in successfully",
      data: {
        admin: {
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

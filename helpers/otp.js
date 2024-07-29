const crypto = require('crypto');
require("dotenv").config();

exports.generateOTP = () => {
    return crypto.randomInt(100000, 999999).toString();
};

exports.sendOTP = async (phoneNumber, otp) => {
    const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    await client.messages.create({
        body: `Your OTP code is ${otp}`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phoneNumber
    });
};

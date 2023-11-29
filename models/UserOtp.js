const mongoose = require('mongoose');

// Create a Mongoose schema for the OTP model
const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    required: false,
    default:false
  },
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

// S // 300 seconds = 5 minutes
otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });
// Create the OTP model
const OTP = mongoose.model('UserOtp', otpSchema);

module.exports = OTP;

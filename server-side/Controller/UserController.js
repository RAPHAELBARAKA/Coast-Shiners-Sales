// UserController.js
const bcrypt = require('bcryptjs');
const userdata = require("../Model/User");
const randomstring = require('randomstring');
const nodemailer = require('nodemailer'); // Import nodemailer

exports.registerUser = async (req, res) => {
  // Controller logic for user registration
  const { name, email, phone, id, role, password, confirm } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10); // Increased salt rounds for stronger hashing

  try {
    const user = await userdata.findOne({ email });

    if (user) {
      return res.json("exist");
    }

    const newUser = new userdata({
      name,
      email,
      phone,
      id,
      role,
      password: hashedPassword,
      confirm,
      isVerified : false
    });

    await newUser.save();

    const otp = randomstring.generate(4);
    newUser.otp = otp; // Save OTP to user object
    await newUser.save();

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'goldensilver424@gmail.com',
        pass: 'nyjq pfev nuen lpnm',
      },
  });

  const mailOptions = {
    from: 'goldensilver424@gmail.com',
    to: email,
    subject: 'OTP for Registration',
    text: `Your OTP for registration is: ${otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    } else {
      console.log('Email sent: ' + info.response);
      return res.json({ message: 'User registered. Check your email for OTP.', name: newUser.name, email: newUser.email});
    }
  });
} catch (error) {
  console.error(error);
  res.status(500).json({ message: 'An error occurred during registration. Please try again later.' });
}
};


exports.verifyOtp = async (req, res) => {
  const { enteredOTP } = req.body;

  try {
    const user = await userdata.findOne({ otp: enteredOTP });

    if (enteredOTP == null ) {
      return res.status(400).json({ message: 'OTP Required' });
    }

    if (!user) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }
    
    // Set isVerified status to true upon successful OTP verification
    user.isVerified = true;
    await user.save();

    res.json({ message: 'OTP verified' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

exports.resendOtp = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await userdata.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const otp = randomstring.generate(4);
    user.otp = otp;
    await user.save();

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587, // Use the appropriate port for your setup
       secure: false, // Set to true for SSL/TLS, false for SMTP
       auth: {
          user: 'goldensilver424@gmail.com',
          pass: 'nyjq pfev nuen lpnm',
      },
  });

  const mailOptions = {
      from: 'goldensilver424@gmail.com',
      to: email,
      subject: 'OTP for Registration',
      text: `Your OTP for registration is: ${otp}`,
  };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
      } else {
        console.log('Email sent: ' + info.response);
        return res.json({ message: 'OTP resent. Check your email for the new OTP.' });
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userdata.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.password) {
      return res.status(401).json({ message: 'Please provide a password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!user.isVerified) {
      return res.status(403).json({ message: 'Your account is not verified. Please check your email for the verification link.' });
    }

    if (passwordMatch) {
      const currentLoginTime = new Date();
      const previousLastLogin = user.lastLogin || currentLoginTime;

      user.loginRecords.push({ loginTime: previousLastLogin });
      user.lastLogin = currentLoginTime;
      await user.save();

      const response = {
        message: 'Login successful',
        isAdmin: user.role === 'admin',
        isDoctor: user.role === 'doctor',
        lastLogin: previousLastLogin, // Include the last login time in the response
      };

      return res.status(200).json(response);
    } else {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'An error occurred during login' });
  }
};

exports.sendPasswordOTP = async (req, res) => {
  // Controller logic for sending password OTP
  const { email } = req.body;

  try {
    const user = await userdata.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const passOtp = randomstring.generate(4);
    user.passOtp = passOtp;
    await user.save();

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587, // Use the appropriate port for your setup
       secure: false, // Set to true for SSL/TLS, false for SMTP
       auth: {
          user: 'goldensilver424@gmail.com',
          pass: 'nyjq pfev nuen lpnm',
      },
  });

  const mailOptions = {
      from: 'goldensilver424@gmail.com',
      to: email,
      subject: 'OTP for password',
      text: `Your OTP for verification is: ${passOtp}`,
  };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
      } else {
        console.log('Email sent: ' + info.response);
        return res.json({ message: 'OTP sent. Check your email for your password OTP.' });
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.verifyPasswordOTP = async (req, res) => {
  // Controller logic for verifying password OTP
  const { enteredPassOTP } = req.body;

  try {
    const user = await userdata.findOne({ passOtp: enteredPassOTP });

    if (!user || user.passOtp !== enteredPassOTP) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    res.json({ message: 'OTP verified' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.resendPasswordOTP = async (req, res) => {
  // Controller logic for resending password OTP
  const { email } = req.body;

  try {
    // Check if the user exists
    const user = await userdata.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Generate a new password OTP
    const passOtp = randomstring.generate(4);
    user.passOtp = passOtp;
    await user.save();

    // Send the new password OTP via email
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'goldensilver424@gmail.com',
        pass: 'nyjq pfev nuen lpnm',
      },
    });

    const mailOptions = {
      from: 'goldensilver424@gmail.com',
      to: email,
      subject: 'OTP for password',
      text: `Your new OTP for verification is: ${passOtp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
      } else {
        console.log('Email sent: ' + info.response);
        return res.json({ message: 'New OTP sent. Check your email for your password OTP.' });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while resending OTP. Please try again later.' });
  }
  
};

exports.resetPassword = async (req, res) => {
  // Controller logic for resetting password
  const { email, newPassword } = req.body;

  try {
    // Find user by email
    const user = await userdata.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ message: 'An error occurred while resetting password. Please try again later.' });
  }
};

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://raphaelbaraka424:coastshiners@coastshiners.w0sxa.mongodb.net/?retryWrites=true&w=majority&appName=coastshiners')
  .then(() => {
    console.log("Connected to User management");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });
const newSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirm: {
        type: String,
        required: true
    },
    otp: {
        type: String
    },
    passOtp: {
        type: String
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'doctor'],
        default: 'user' // Set default value to 'user'
    },
    loginRecords: [
        {
            loginTime: {
                type: Date,
                required: true
            }
        }
    ]
});

const userdata = mongoose.model("userdata", newSchema);

module.exports = userdata;



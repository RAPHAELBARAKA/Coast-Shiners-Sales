const express = require('express');
const session = require('express-session');
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const app = express();

// Middleware setup
app.use(cors({
  origin: 'https://your-frontend-domain.com',  // Replace with your frontend domain
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files setup
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Session middleware initialization
app.use(session({
  secret: 'your-secret-key',  // Replace with your actual secret key
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true, // Ensure this is true if using HTTPS
    httpOnly: true,
    sameSite: 'none', // Ensures the cookie is sent across domains
  }
}));

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Basic route to test server
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Import controllers
const UserController = require('./Controller/UserController');
const ItemManagementController = require('./Controller/ItemManagementController');
const OrderController = require('./Controller/OrderController');
const PaymentController = require('./Controller/PaymentController');

// User routes
app.post("/register", UserController.registerUser);
app.post("/verify-otp", UserController.verifyOtp);
app.post("/resend-otp", UserController.resendOtp);
app.post("/login", UserController.loginUser);
app.post("/password-otp", UserController.sendPasswordOTP);
app.post("/verifypassword-otp", UserController.verifyPasswordOTP);
app.post("/resendpass-otp", UserController.resendPasswordOTP);
app.post("/resetpassword", UserController.resetPassword);

// Admin routes
app.post("/add-item", upload.single('image'), ItemManagementController.addItem);
app.get("/get-item", ItemManagementController.getItem);
app.post("/place-order", upload.none(), OrderController.recieveOrder);
app.get("/api/orders", OrderController.getOrders);
app.post("/initiate-payment", PaymentController.initiatepayment);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const express = require('express');
const session = require('express-session');
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const app = express();

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });


// Middleware setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware initialization
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));
app.get('/', (req, res) => {
  res.send('Server is running');
});


// Import UserController
const UserController = require('./Controller/UserController');
const ItemManagementController = require ('./Controller/ItemManagementController')
const OrderController = require ("./Controller/OrderController")
const PaymentController = require ("./Controller/PaymentController");
const Notifications = require ('./Controller/NotificationController')
// User routes
app.post("/", UserController.registerUser);
app.post("/verify-otp", UserController.verifyOtp);
app.post("/resend-otp", UserController.resendOtp);
app.post("/login", UserController.loginUser);
app.post("/password-otp", UserController.sendPasswordOTP);
app.post("/verifypassword-otp", UserController.verifyPasswordOTP);
app.post("/resendpass-otp", UserController.resendPasswordOTP);
app.post("/resetpassword", UserController.resetPassword);

//Admin routes
app.post("/add-item", upload.single('image'),ItemManagementController.addItem);
app.get("/get-item",ItemManagementController.getItem);
app.get("/all/orders",OrderController.getAllOrders);


app.post("/place-order", OrderController.receiveOrder);
app.get("/api/orders",OrderController.getOrders);
app.post("/initiate-payment", PaymentController.initiatepayment);
app.get("/get-all-items",ItemManagementController.getAllItems);
app.put('/orders/:orderId/approve',OrderController.approveOrder);
app.put('/orders/:orderId/cancel', OrderController.cancelOrder);
app.delete('/orders/:orderId/delete', OrderController.deleteOrder);

//Notifications
app.get("/get-notifications/:userId",Notifications.getNotification);


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

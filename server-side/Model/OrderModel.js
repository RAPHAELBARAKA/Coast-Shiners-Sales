const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://raphaelbaraka424:coastshiners@coastshiners.w0sxa.mongodb.net/?retryWrites=true&w=majority&appName=coastshiners')
  .then(() => {
    console.log("Connected to Orders");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });
  const orderItemSchema = new mongoose.Schema({
    description: { type: String, required: true },
    size: { type: String, required: true },
    color: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  });
  
  const orderSchema = new mongoose.Schema({
    orderNumber: { type: String, required: true, unique: true },
    userEmail: { type: String, required: true },
    userName: { type: String, required: true },
    userPhone: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    items: [orderItemSchema],
    status: { type: String, default: 'Pending' },
    orderDate: { type: Date, default: Date.now }
  });
  
  const Order = mongoose.model('Order', orderSchema);
  
  module.exports = Order;
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://raphaelbaraka424:coastshiners@coastshiners.w0sxa.mongodb.net/?retryWrites=true&w=majority&appName=coastshiners')
  .then(() => {
    console.log("Connected to Orders");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true, unique: true },
  items: [
    {
      description: String,
      size: String,
      color: String,
      quantity: Number,
      price: Number,
    }
  ],
  totalAmount: Number,
  email: String,
  name: String,
  phone: String,
  orderDate: { type: Date, default: Date.now },
  status: { type: String, default: 'Pending' } // Add status field with default value
});

const Orders = mongoose.model('Orders', orderSchema);

module.exports = Orders;

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://raphaelbaraka424:coastshiners@coastshiners.w0sxa.mongodb.net/?retryWrites=true&w=majority&appName=coastshiners')
  .then(() => {
    console.log("Connected to Orders");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });

    
const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true, unique: true }, // Add orderNumber field
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
  orderDate: { type: Date, default: Date.now }, // Change to Date type
  // Additional fields as needed
});

const Orders = mongoose.model('Orders', orderSchema);

module.exports = Orders;

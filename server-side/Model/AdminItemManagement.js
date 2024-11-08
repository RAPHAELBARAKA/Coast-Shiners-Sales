const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://raphaelbaraka424:coastshiners@coastshiners.w0sxa.mongodb.net/?retryWrites=true&w=majority&appName=coastshiners')
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });
  
const orderSchema = new mongoose.Schema({
  orderNumber: String,
  orderedQuantity: Number,
  totalAmount: Number,
  email: String,
  name: String,
  phone: String,
  orderDate: { type: Date, default: Date.now },
  status: { type: String, default: 'Pending' }
});

const itemSchema = new mongoose.Schema({
  code: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 0 },
  image: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  orders: [orderSchema]
}, { timestamps: true });

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
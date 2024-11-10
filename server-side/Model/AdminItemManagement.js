const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://raphaelbaraka424:coastshiners@coastshiners.w0sxa.mongodb.net/?retryWrites=true&w=majority&appName=coastshiners')
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });


const itemSchema = new mongoose.Schema({
  code: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 0 },
  image: { type: String, required: true },
  isVisible: { type: Boolean, default: true },  // New field to control visibility
  createdAt: { type: Date, default: Date.now },
},
 { timestamps: true });

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
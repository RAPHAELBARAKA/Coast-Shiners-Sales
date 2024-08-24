const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://raphaelbaraka424:coastshiners@coastshiners.w0sxa.mongodb.net/?retryWrites=true&w=majority&appName=coastshiners')
  .then(() => {
    console.log("Connected to Item management");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });
const itemSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    } ,
    code: {
      type: String,
      required: true
  }

});

const AdminItemManagement = mongoose.model('AdminItemManagement', itemSchema);

module.exports = AdminItemManagement;

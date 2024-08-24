
const AdminItemManagement = require("../Model/AdminItemManagement");
exports.addItem = async (req, res) => {
  try {
    if (!req.file || !req.body.code) {
      return res.status(400).json({ message: 'Image or name missing' });
    }
    const { code } = req.body; // Extract name from request body
    const imagePath = req.file.path;
    const newItem = new AdminItemManagement({ code, image: imagePath }); // Save name along with image
    await newItem.save();
    res.status(200).json({ imagePath, code }); // Send both image path and name in the response
  } catch (error) {
    console.error('Failed to upload service:', error);
    res.status(500).json({ message: 'Failed to upload service' });
  }

};
exports.getItem = async (req, res) => {
  try {
    // Get code from query parameters
    const code = req.query.code;

    // If code is provided, filter items by code
    const filter = code ? { code } : {};

    const items = await AdminItemManagement.find(filter);
    
    // Ensure the response is an array
    if (!Array.isArray(items)) {
      console.error('Expected an array but got:', typeof items);
      return res.status(500).json({ message: 'Server error, expected array but got non-array' });
    }

    res.status(200).json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ message: 'Failed to fetch items' });
  }
};
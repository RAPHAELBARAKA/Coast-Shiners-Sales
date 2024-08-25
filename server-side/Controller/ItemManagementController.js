const AdminItemManagement = require("../Model/AdminItemManagement");

exports.addItem = async (req, res) => {
  try {
    const { code, description, price } = req.body;

    // Validate required fields
    if (!req.file || !code || !description || !price) {
      return res.status(400).json({ message: 'Image, code, description, or price missing' });
    }

    const imagePath = req.file.path;

    // Create a new item with code, description, price, and image path
    const newItem = new AdminItemManagement({
      code,
      description,
      price,
      image: imagePath
    });

    await newItem.save();

    res.status(200).json({ imagePath, code, description, price }); // Send response with all fields
  } catch (error) {
    console.error('Failed to upload item:', error);
    res.status(500).json({ message: 'Failed to upload item' });
  }
};

exports.getItem = async (req, res) => {
  try {
    const code = req.query.code;
    const filter = code ? { code } : {};

    const recentItems = await AdminItemManagement.find(filter)
      .sort({ createdAt: -1 })
      .limit(1);

    res.status(200).json(recentItems);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ message: 'Failed to fetch items' });
  }
};

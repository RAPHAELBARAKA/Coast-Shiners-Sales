const Item = require("../Model/AdminItemManagement");
exports.addItem = async (req, res) => {
  try {
    const { code, name, description, price } = req.body;

    // Validate required fields
    if (!req.file || !code || !name || !description || !price) {
      return res.status(400).json({ message: 'Image, code, name, description, or price missing' });
    }

    const imagePath = req.file.path;

    // Create a new item with the provided data
    const newItem = new Item({
      code,
      name,
      description,
      price,
      image: imagePath
    });

    await newItem.save();
    res.status(200).json({ imagePath, code, name, description, price });
  } catch (error) {
    console.error('Failed to upload item:', error);
    res.status(500).json({ message: 'Failed to upload item' });
  }
};

exports.getItem = async (req, res) => {
  try {
    const code = req.query.code;
    const filter = code ? { code, isVisible: true } : { isVisible: true };  // Add visibility filter here

    const recentItems = await Item.find(filter)
      .sort({ createdAt: -1 })
      .limit(1);

    res.status(200).json(recentItems);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ message: 'Failed to fetch items' });
  }
};

exports.getAllItems = async (req, res) => {
  try {
    const code = req.query.code;
    
    // Fetch all items that are visible and optionally filter by code
    const filter = code ? { code, isVisible: true } : { isVisible: true };
    const items = await Item.find(filter).sort({ createdAt: -1 });

    res.status(200).json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ message: 'Failed to fetch items' });
  }
};



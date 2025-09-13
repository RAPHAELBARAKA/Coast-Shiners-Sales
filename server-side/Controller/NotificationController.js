const Notification = require('../Model/NotificationsModel');

exports.getNotification = async (req, res) => {
    try {
    const { userId } = req.params;
    const notifications = await Notification.find({ userId })
      .sort({ createdAt: -1 })
      .populate('userId', 'name email');
    
    res.json(notifications);
  }
   catch (error) {
    console.error('Error creating registration notification:', error);
    return res.status(500).json({ 
      message: 'An error occurred while creating notification',
      error: error.message 
    });
  }
};
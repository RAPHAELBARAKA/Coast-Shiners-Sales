const Notification = require('../Model/NotificationModel');

exports.createRegistrationNotification = async (req, res) => {
  try {
    const { userId, userName } = req.body; 

    if (!userId || !userName) {
      return res.status(400).json({ 
        message: 'User ID and user name are required' 
      });
    }

    const message = `Welcome to Coast Shiners, ${userName}! Thank you for registering.`;
    
    const notification = new Notification({
      userId,
      message,
      type: 'registration'
    });
    
    await notification.save();
    console.log(`Registration notification created for user: ${userName}`);
    
    return res.status(201).json({ 
      success: true, 
      message: 'Registration notification created successfully',
      notification 
    });
  } catch (error) {
    console.error('Error creating registration notification:', error);
    return res.status(500).json({ 
      message: 'An error occurred while creating notification',
      error: error.message 
    });
  }
};
const Order = require("../Model/OrderModel"); // Ensure this imports the correct Order model
const Item = require("../Model/AdminItemManagement"); // Ensure this imports the correct Item model

const crypto = require('crypto');
const mongoose = require('mongoose');

// Generate a unique order number
const generateOrderNumber = () => {
  return 'ORD-' + Math.floor(Math.random() * 1000000).toString();
};

exports.receiveOrder = async (req, res) => {
  try {
    const { email, userName, phone, totalAmount, items } = req.body;

    if (!email || !userName || !phone || !totalAmount || !items || items.length === 0) {
      return res.status(400).json({ message: 'Missing required order details.' });
    }

    const orderNumber = generateOrderNumber();

    const order = new Order({
      orderNumber,
      userEmail: email,
      userName,
      userPhone: phone,
      totalAmount,
      items,
    });

    await order.save();
    for (const itemDetails of items) {
      await Item.findOneAndUpdate(
        { description: itemDetails.description },
        { isVisible: false }
      );
    }

    res.status(200).json({
      message: 'Order placed successfully',
      orderNumber,
      totalAmount,
      items,
    });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Error placing order', error: error.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const orders = await Order.find({ userEmail: email });
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};

exports.approveOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ message: 'Invalid order ID format' });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.status === 'Approved') {
      return res.status(400).json({ message: 'Order is already approved' });
    }

    for (const itemDetails of order.items) {
      const result = await Item.findOneAndDelete({ description: itemDetails.description });

      if (!result) {
        return res.status(404).json({ message: `Item with description "${itemDetails.description}" not found` });
      }
    }

    order.status = 'Approved';
    await order.save();

    res.status(200).json({ message: 'Order approved successfully and items removed', order });
  } catch (error) {
    console.error('Error approving order:', error);
    res.status(500).json({ message: 'Error approving order', error: error.message });
  }
};

exports.cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    // Update the order status to "Cancelled"
    const result = await Order.updateOne(
      { _id: orderId },
      { $set: { status: "Cancelled" } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Find the order to retrieve items
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Update each item's visibility to true
    for (const itemDetails of order.items) {
      await Item.findOneAndUpdate(
        { description: itemDetails.description },
        { isVisible: true }
      );
    }

    res.status(200).json({ message: 'Order cancelled successfully and items made visible again' });
  } catch (error) {
    console.error('Error cancelling order:', error);
    res.status(500).json({ message: 'Error cancelling order', error: error.message });
  }
};


exports.deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const result = await Order.deleteOne({ _id: orderId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ message: 'Error deleting order', error: error.message });
  }
};

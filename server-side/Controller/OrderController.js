const Item = require("../Model/OrderModel");
const crypto = require('crypto');
const mongoose = require('mongoose');

// Generate a unique order number
function generateOrderNumber() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const randomComponent = crypto.randomBytes(4).toString('hex').toUpperCase(); // Add a unique random component

  return `ORD${year}${month}${day}${hours}${randomComponent}`;
}

exports.receiveOrder = async (req, res) => {
  try {
    let orderNumber;
    let orderExists = true;

    // Ensure unique order number
    while (orderExists) {
      orderNumber = generateOrderNumber();
      const existingOrder = await Item.findOne({ "orders.orderNumber": orderNumber });
      if (!existingOrder) {
        orderExists = false;
      }
    }

    const orderDate = new Date();
    const email = req.body.email;
    const userName = req.body.userName;
    const phone = req.body.phone;
    const orderItems = [];
    const totalAmount = parseFloat(req.body.totalAmount);

    for (let i = 0; i < Object.keys(req.body).length; i++) {
      if (req.body[`description${i}`]) {
        const description = req.body[`description${i}`];
        const orderedQuantity = parseInt(req.body[`quantity${i}`], 10);
        const price = parseFloat(req.body[`price${i}`]);

        // Update the item's quantity and add the order details to the `orders` array
        const updatedItem = await Item.findOneAndUpdate(
          { description: description },
          {
            $inc: { quantity: -orderedQuantity },
            $push: {
              orders: {
                orderNumber,
                orderedQuantity,
                totalAmount,
                email,
                name: userName,
                phone,
                orderDate,
                status: 'Pending'
              }
            }
          },
          { new: true }
        );

        if (!updatedItem) {
          return res.status(404).json({ message: `Item with description "${description}" not found` });
        }

        orderItems.push({ description, orderedQuantity, price });
      }
    }

    res.status(200).json({ message: 'Order placed successfully', orderNumber, orderItems });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Error placing order', error: error.message });
  }
};

// Fetch orders based on email
exports.getAllOrders = async (req, res) => {
  try {
    // Fetch all orders from the database
    const orders = await Item.find();

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

    // Fetch items where orders contain the user's email
    const orders = await Item.find({ "orders.email": email }, { "orders.$": 1 });

    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};
exports.approveOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    console.log('Attempting to approve order with ID:', orderId);

    // Validate orderId format
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({ message: 'Invalid order ID format' });
    }

    // Find the item containing the order by the orderId
    const item = await Item.findOne({ 'orders._id': orderId });

    if (!item) {
      console.log(`Order with ID ${orderId} not found.`);
      return res.status(404).json({ message: 'Order not found' });
    }

    // Find the specific order in the orders array
    const order = item.orders.id(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found in the orders array' });
    }

    if (order.status === 'Approved') {
      return res.status(400).json({ message: 'Order is already approved' });
    }

    // Remove each item from AdminItemManagement when the order is approved
    for (const itemDetails of order.items) {
      const result = await Item.findOneAndDelete(
        { description: itemDetails.description } // Adjust this based on your actual item identifier
      );

      if (!result) {
        return res.status(404).json({ message: `Item with description "${itemDetails.description}" not found` });
      }
    }

    // Update the order status to "Approved"
    order.status = 'Approved';
    await item.save();

    res.status(200).json({ message: 'Order approved successfully and items removed', item });
  } catch (error) {
    console.error('Error approving order:', error);
    res.status(500).json({ message: 'Error approving order', error: error.message });
  }
};

exports.cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    // Update the order status to "Cancelled"
    const result = await Item.updateOne(
      { "orders._id": orderId },
      { $set: { "orders.$.status": "Cancelled" } }
    );

    if (!result.nModified) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order cancelled successfully' });
  } catch (error) {
    console.error('Error cancelling order:', error);
    res.status(500).json({ message: 'Error cancelling order', error: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    // Delete the order from the orders array in the item
    const result = await Item.updateOne(
      { "orders._id": orderId },
      { $pull: { orders: { _id: orderId } } }
    );

    if (!result.nModified) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ message: 'Error deleting order', error: error.message });
  }
};

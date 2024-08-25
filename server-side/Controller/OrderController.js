const Orders = require("../Model/OrderModel");

function generateOrderNumber() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');

  return `ORD${year}${month}${day}${hours}`;
}
exports.recieveOrder = async (req, res) => {
    try {
      console.log('Request body:', req.body);
  
      // Generate order number
      const orderNumber = generateOrderNumber();
      const orderDate = new Date(); // Get the current date and time
  
      // Extract order details from request body
      const orderItems = [];
      for (let i = 0; i < Object.keys(req.body).length; i++) {
        if (req.body[`description${i}`]) {
          orderItems.push({
            description: req.body[`description${i}`],
            size: req.body[`size${i}`],
            color: req.body[`color${i}`],
            quantity: parseInt(req.body[`quantity${i}`], 10),
            price: parseFloat(req.body[`price${i}`]),
          });
        }
      }
  
      console.log('Order Items:', orderItems);
      console.log('Total Amount:', req.body.totalAmount);
  
      // Save order to database with generated order number and date
      const newOrder = await Orders.create({
        orderNumber: orderNumber,
        orderDate: orderDate, // Add date field
        items: orderItems,
        totalAmount: parseFloat(req.body.totalAmount),
      });
  
      // Respond with success and the order number
      res.status(200).json({ message: 'Order placed successfully', orderNumber: orderNumber });
    } catch (error) {
      console.error('Error placing order:', error);
      res.status(500).json({ message: 'Error placing order', error: error.message });
    }
  };
  
// In OrderController.js or a similar file
exports.getOrders = async (req, res) => {
    try {
      // Fetch orders from the database
      const orders = await Orders.find(); // Assuming Orders is your model
      res.status(200).json(orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
  };
  
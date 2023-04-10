const Order = require('../schemas/orderSchema')

exports.getOrders = async (req, res) => {
    try {
      const order = await Order.find({ user: req.userData._id })
      .populate({ path: 'orderRows.product', model: 'Product' })
      .exec();
      res.status(200).json(order)

    } catch (err) {
      res.status(500).json({
        message: 'Something went wrong when fetching the orders',
        err: err.message
      })
    }
  }
  
  exports.createNewOrder = async (req, res) => {
    const { orderRows } = req.body;
  
    if(!orderRows) {
      return res.status(400).json({
        message: 'You need to enter orderRows'
      })
    }
    try {
      const order = await Order.create({
        orderRows,
        user: req.userData._id
      })
      res.status(201).json(order)
    } catch (err) {
      res.status(500).json({
        message: 'Something went wrong when creating the order',
        err: err.message
      })
    }
  }
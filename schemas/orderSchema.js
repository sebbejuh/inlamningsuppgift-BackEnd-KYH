const mongoose = require('mongoose');
const {Schema} = mongoose;

const orderRowSchema = new Schema({
    product:        {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
    quantity:       {type: Number, default: 1}
})

const orderSchema = new Schema({
    user:         {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    orderRows:    {type: [orderRowSchema]}
})

module.exports = mongoose.model('Order', orderSchema);
const router = require('express').Router()
const orderModel = require('../models/orderModel')
const auth = require('../authentication/auth')

router.get('/', auth.verifyToken, orderModel.getOrders)         //Hämta ordrar som en user har skapat

router.post('/', auth.verifyToken, orderModel.createNewOrder)   //Skapa en order om du är inloggad

module.exports = router

//JSON exempel på POST =
// {
//     "orderRows": [
//         {
//         "product": "642f00d953095de28fce2e29",
//         "quantity": 11
//         },
//         {
//         "product": "642f01ca53095de28fce2e2c",
//         "quantity": 11
//         }
//     ]
// }
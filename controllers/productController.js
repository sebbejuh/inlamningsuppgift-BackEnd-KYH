const router = require("express").Router();
const productModel = require('../models/productModel')

router.post('/', productModel.addProduct)   //POST - Skapar ny produkt products/
router.get('/', productModel.getAllProducts)  //GET - Hämtar alla produkter products/
router.get('/:id', productModel.getOneProduct) //GET - Hämtar en produkt med rätt id products/id
router.put('/:id', productModel.updateProductPrice) //PUT - Uppdaterar produktpris products/id med JSON: "price": 43
router.delete('/:id', productModel.removeProduct) //DELETE - Tar bort produkt products/id

module.exports = router;
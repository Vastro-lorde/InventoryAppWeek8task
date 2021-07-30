// importing the necessary modules
const router = require('express').Router();
const {getAllProducts, createProduct, updateProduct, deleteProduct} = require('../controller/productController')
const auth = require('../middlewares/auth')

router.get('/all', auth , getAllProducts );
router.post('/add', auth , createProduct );
router.patch('/edit', auth, updateProduct);
router.delete('/del', auth, deleteProduct);

// exporting the router
module.exports = router;
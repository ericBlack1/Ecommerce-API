const express = require('express');
const {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const authenticateToken = require('../middlewares/authenticateToken');

const router = express.Router();

router.get('/', getAllProducts);

router.post('/', authenticateToken, addProduct);
router.put('/:id', authenticateToken, updateProduct);
router.delete('/:id', authenticateToken, deleteProduct);

module.exports = router;

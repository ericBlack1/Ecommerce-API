const express = require('express');
const {
  getAllOrders,
  createOrder,
  updateOrderStatus,
} = require('../controllers/orderController');
const authenticateToken = require('../middlewares/authenticateToken');

const router = express.Router();



router.get('/', authenticateToken, getAllOrders);
router.post('/', authenticateToken, createOrder);
router.put('/:id', authenticateToken, updateOrderStatus);

module.exports = router;

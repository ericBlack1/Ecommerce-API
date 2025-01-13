const express = require('express');
const authenticateToken = require('../middlewares/authenticateToken');

const router = express.Router();

router.get('/dashboard', authenticateToken, (req, res) => {
    res.json({ message: `Welcome ${req.user.username}` });
});

module.exports = router;

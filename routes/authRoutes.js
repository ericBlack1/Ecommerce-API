const express = require('express');
const { register, generate2FA, verify2FA, login } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/generate-2fa', generate2FA);
router.post('/verify-2fa', verify2FA);
router.post('/login', login);

module.exports = router;

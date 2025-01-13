const express = require('express');
const { register, generate2FA, verify2FA, login } = require('../controllers/authController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication API
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: User already exists
 */
router.post('/register', register);

/**
 * @swagger
 * /api/auth/generate-2fa:
 *   post:
 *     summary: Generate a QR code for 2FA
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *     responses:
 *       200:
 *         description: QR code generated successfully
 *       404:
 *         description: User not found
 */
router.post('/generate-2fa', generate2FA);

/**
 * @swagger
 * /api/auth/verify-2fa:
 *   post:
 *     summary: Verify the 2FA token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               token:
 *                 type: string
 *     responses:
 *       200:
 *         description: 2FA verified and enabled
 *       404:
 *         description: User not found or 2FA not enabled
 *       400:
 *         description: Invalid token
 */
router.post('/verify-2fa', verify2FA);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login with 2FA
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               token:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid password
 *       400:
 *         description: Invalid 2FA token
 */
router.post('/login', login);

module.exports = router;

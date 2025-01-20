const express = require('express');
const {
  register,
  login,
  forgotPassword,
  resetPassword,
  googleAuthLogin,
} = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with email and password.
 *     parameters:
 *       - in: body
 *         name: user
 *         description: User registration details
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               example: user@example.com
 *             password:
 *               type: string
 *               example: strongpassword123
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input
 */
router.post('/register', register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Log in a user
 *     description: Log in a user by providing email and password.
 *     parameters:
 *       - in: body
 *         name: credentials
 *         description: User login credentials
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               example: user@example.com
 *             password:
 *               type: string
 *               example: strongpassword123
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', login);

/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     summary: Forgot password
 *     description: Send a password reset email to the user.
 *     parameters:
 *       - in: body
 *         name: email
 *         description: User's email address
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               example: user@example.com
 *     responses:
 *       200:
 *         description: Password reset email sent
 *       404:
 *         description: User not found
 */
router.post('/forgot-password', forgotPassword);

/**
 * @swagger
 * /api/auth/reset-password:
 *   post:
 *     summary: Reset user password
 *     description: Reset the user's password using a reset token.
 *     parameters:
 *       - in: body
 *         name: reset
 *         description: Reset password details
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               example: user@example.com
 *             token:
 *               type: string
 *               example: abc123token
 *             newPassword:
 *               type: string
 *               example: newpassword123
 *     responses:
 *       200:
 *         description: Password updated
 *       400:
 *         description: Invalid token or input
 */
router.post('/reset-password', resetPassword);

/**
 * @swagger
 * /api/auth/google-auth-login:
 *   post:
 *     summary: Google Authenticator login
 *     description: Log in a user using Google Authenticator.
 *     parameters:
 *       - in: body
 *         name: credentials
 *         description: User's Google Authenticator token
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               example: user@example.com
 *             token:
 *               type: string
 *               example: 123456
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Invalid Google Authenticator token
 */
router.post('/google-auth-login', googleAuthLogin);

module.exports = router;

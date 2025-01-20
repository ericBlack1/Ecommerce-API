const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');
const sendEmail = require('../utils/sendEmail');
const { generateSecret, verifyToken } = require('../utils/googleAuthenticator');

exports.register = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const user = await User.createUser(email, password);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  res.json({ token: generateToken(user.id) });
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findByEmail(email);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  const resetToken = generateToken(user.id);
  await sendEmail(email, 'Password Reset', `Your reset token: ${resetToken}`);
  res.json({ message: 'Reset email sent' });
};

exports.resetPassword = async (req, res) => {
  const { email, token, newPassword } = req.body;
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    await User.updatePassword(email, newPassword);
    res.json({ message: 'Password updated' });
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

exports.googleAuthLogin = async (req, res) => {
  const { email, token } = req.body;
  const user = await User.findByEmail(email);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  if (verifyToken(user.google_secret, token)) {
    res.json({ token: generateToken(user.id) });
  } else {
    res.status(401).json({ message: 'Invalid token' });
  }
};

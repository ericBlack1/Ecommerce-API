const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const User = require('../models/userModel');

exports.register = async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.generate2FA = async (req, res) => {
    const { username } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const secret = speakeasy.generateSecret({ name: `EcommerceApp (${username})` });
        user.twoFactorSecret = secret.base32;
        await user.save();

        const qrCode = await qrcode.toDataURL(secret.otpauth_url);
        res.json({ qrCode });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.verify2FA = async (req, res) => {
    const { username, token } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user || !user.twoFactorSecret) return res.status(404).json({ message: 'User not found or 2FA not enabled' });

        const verified = speakeasy.totp.verify({
            secret: user.twoFactorSecret,
            encoding: 'base32',
            token,
        });

        if (verified) {
            user.twoFactorEnabled = true;
            await user.save();
            res.json({ message: '2FA verified and enabled' });
        } else {
            res.status(400).json({ message: 'Invalid token' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.login = async (req, res) => {
    const { username, password, token } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: 'Invalid password' });

        if (user.twoFactorEnabled) {
            const verified = speakeasy.totp.verify({
                secret: user.twoFactorSecret,
                encoding: 'base32',
                token,
            });
            if (!verified) return res.status(400).json({ message: 'Invalid 2FA token' });
        }

        const jwtToken = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token: jwtToken });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

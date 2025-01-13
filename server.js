const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const connectDB = require('./config/db');
const swaggerDocs = require('./config/swagger');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

swaggerDocs(app);

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

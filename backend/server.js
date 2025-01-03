// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// Routes
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/books');
const paymentRoutes = require('./routes/payment');

app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/payment', paymentRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

// Sample .env file
// MONGO_URI=mongodb://localhost:27017/bookstore

// Routes - Authentication
const authRouter = express.Router();
const users = [];

// Send OTP
authRouter.post('/send-otp', (req, res) => {
  const { phone } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000);
  users[phone] = { otp };
  res.json({ success: true, message: 'OTP sent!', otp });
});

// Verify OTP
authRouter.post('/verify-otp', (req, res) => {
  const { phone, otp } = req.body;
  if (users[phone] && users[phone].otp == otp) {
    res.json({ success: true, message: 'OTP verified!' });
  } else {
    res.status(400).json({ success: false, message: 'Invalid OTP' });
  }
});

app.use('/api/auth', authRouter);

// Routes - Books
const booksRouter = express.Router();
const axios = require('axios');

booksRouter.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://example-api.com/books'); // Replace with actual API
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch books' });
  }
});

app.use('/api/books', booksRouter);

// Routes - Payment
const paymentRouter = express.Router();

paymentRouter.post('/validate-upi', (req, res) => {
  const { upiId } = req.body;
  if (upiId === 'mkdharshini24@okicici') {
    res.json({ success: true, message: 'Payment successful!' });
  } else {
    res.status(400).json({ success: false, message: 'Invalid UPI ID' });
  }
});

app.use('/api/payment', paymentRouter);


const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const confessionRoutes = require('./routes/confessionRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(helmet());
app.use(express.json());

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests. Please try again later.'
  }
});

app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Dev Confessions API is running'
  });
});

app.use('/api/v1/confessions', apiLimiter, confessionRoutes);

app.use(errorHandler);

module.exports = app;
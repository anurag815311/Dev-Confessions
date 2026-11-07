const express = require('express');
const confessionRoutes = require('./routes/confessionRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(express.json());

app.use('/api/v1/confessions', confessionRoutes);

// Centralised error handling must be registered after routes.
app.use(errorHandler);

module.exports = app;
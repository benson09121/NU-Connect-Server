const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const db = require('./config/db');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import routes
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const facebookRoutes = require('./routes/facebook');

// Use routes
app.use('/', indexRoutes);
app.use('/api/mobile', authRoutes);
app.use('/api/mobile', facebookRoutes);

app.listen(3000, () => {
    console.log('NU-Connect server is Running~~~');
});
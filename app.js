const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const weightRoutes = require('./routes/weightRoutes');
require('dotenv').config();

const app = express();

// Passport Config
require('./config/passport')(passport);

// Connect to MongoDB
connectDB();

// Bodyparser
app.use(express.urlencoded({ extended: false }));

// Express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());


//use ejs as a view engine
app.set('view engine' , 'ejs')

// Static folder
app.use(express.static('public'));

// Routes
app.use('/', authRoutes);
app.use('/weights', weightRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));

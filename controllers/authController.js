const User = require('../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');

exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).send('User already exists');
        }
        user = new User({ name, email, password });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        res.redirect('/login');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.loginUser = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/weights',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
};

exports.logoutUser = (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/login');
    });
};


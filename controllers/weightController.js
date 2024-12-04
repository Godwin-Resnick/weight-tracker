

const Weight = require('../models/Weight');

exports.getWeights = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
        const weights = await Weight.find({ user: req.user.id })
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
        const count = await Weight.countDocuments({ user: req.user.id });
        res.render('weights', {
            weights,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.addWeight = async (req, res) => {
    const { weight } = req.body;
    const date = new Date();
    try {
        const existingWeight = await Weight.findOne({
            user: req.user.id,
            date: { $gte: new Date().setHours(0, 0, 0, 0), $lt: new Date().setHours(23, 59, 59, 999) }
        });
        if (existingWeight) {
            return res.status(400).send('You can add only one weight per day.');
        }
        const newWeight = new Weight({ user: req.user.id, weight, date });
        await newWeight.save();
        res.redirect('/weights');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.editWeight = async (req, res) => {
    const { id } = req.params;
    const { weight } = req.body;
    try {
        await Weight.findByIdAndUpdate(id, { weight }).exec();
        res.redirect('/weights');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.deleteWeight = async (req, res) => {
    const { id } = req.params;
    try {
        await Weight.findByIdAndDelete(id).exec();
        res.redirect('/weights');
    } catch (err) {
        res.status(500).send(err.message);
    }
};

exports.calculateWeightLoss = async (req, res) => {
    const { start, end } = req.query;
    try {
        const weights = await Weight.find({
            user: req.user.id,
            date: { $gte: new Date(start), $lte: new Date(end) }
        }).sort('date');
        
        if (weights.length < 2) {
            return res.json({ weightLoss: 'Insufficient data' });
        }
        const weightLoss = weights[0].weight - weights[weights.length - 1].weight;
        res.json({ weightLoss });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

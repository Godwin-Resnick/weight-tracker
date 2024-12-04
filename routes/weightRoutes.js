const express = require('express');
const router = express.Router();
const weightController = require('../controllers/weightController');
const { isAuthenticated } = require('../middleware/auth');

router.get('/', isAuthenticated, weightController.getWeights);
router.post('/', isAuthenticated, weightController.addWeight);
router.post('/:id/edit', isAuthenticated, weightController.editWeight);
router.post('/:id/delete', isAuthenticated, weightController.deleteWeight);
router.get('/weight-loss', isAuthenticated, weightController.calculateWeightLoss);

module.exports = router;

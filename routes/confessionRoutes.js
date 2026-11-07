const express = require('express');
const router = express.Router();

const confessionController = require('../controllers/confessionController');

router.post('/', confessionController.createConfession);

router.get('/', confessionController.getAllConfessions);

router.get('/category/:cat', confessionController.getConfessionsByCategory);

router.get('/:id', confessionController.getConfessionById);

router.delete('/:id', confessionController.deleteConfession);

module.exports = router;
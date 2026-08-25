const express = require('express');
const router = express.Router();
const favoritesController = require('../controllers/favorites-controller');

router.post('/favorites/:username', favoritesController.addFavorite);
router.get('/favorites/:username', favoritesController.getFavorites);

module.exports = router;
const favoritesService = require('../services/favorites-service');
const getprofiles = require('../services/profile-service');

function addFavorite(req, res) {
    try {
        const username = req.params.username;
        const jobData = req.body;
        const userProfile = getprofiles.findProfileByUsername(username);
        if (!userProfile) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        
        if (!jobData || !jobData.id) {
            return res.status(400).json({
                success: false,
                message: 'Job data with id is required'
            });
        }
        
        const updatedFavorites = favoritesService.addFavorite(username, jobData);
        
        res.status(201).json({
            success: true,
            message: 'Job added to favorites',
            data: {
                username: username,
                favorites: updatedFavorites
            }
        });
        
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

function getFavorites(req, res) {
    try {
        const username = req.params.username;
        
        const userProfile = getprofiles.findProfileByUsername(username);
        if (!userProfile) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        
        const favorites = favoritesService.getFavorites(username);
        
        res.status(200).json({
            success: true,
            data: {
                username: username,
                favorites: favorites,
                count: favorites.length
            }
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {addFavorite, getFavorites};
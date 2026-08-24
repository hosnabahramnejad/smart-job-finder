const getprofiles = require('../services/profile-service');

function createprofile (req, res) {
    try {
        const profiledata = req.body;
        const newprofile = getprofiles.AddProfile(profiledata);
        res.status(201).json(newprofile);
    }catch(error){
        res.status(400).json({
            message: 'Error creating profile',
            error: error.message
        });
    }
}

function getallprofiles (req, res) {
    try{
        const allprofiles = getprofiles.GetAllProfiles();
      
        if (allprofiles.length === 0) {
            return res.status(200).json({
                message: 'No profiles found',
                profiles: []
            });
        }
        
        res.status(200).json({
            count: allprofiles.length,
            profiles: allprofiles
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching profiles',
            error: error.message
        });
    }
}

module.exports = {createprofile, getallprofiles};
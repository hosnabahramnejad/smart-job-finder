const recommendationService = require('../services/recommendation-service');
const getprofiles = require('../services/profile-service');
const getremotejobs = require('../services/jobs-service');
const getjobs = require('../controllers/jobs-controller');

async function getRecommendation(req, res) {
    try {
        const username = req.params.username;
        const userProfile = getprofiles.findProfileByUsername(username);
        if (!userProfile) {
            return res.status(404).json({ message: 'User not found' });
        }
        const skillsWeights = await recommendationService.getSkillsWeights(userProfile.skills || []);
        const allJobs = await getremotejobs(); // اگر async است
        const formatjobs = getjobs.FormatedJobs(allJobs);

        const scoredJobs = formatjobs.map(job => {
            let totalWeight = 0;
            let matchedWeight = 0;
            
            userProfile.skills?.forEach(skill => {
                const weight = skillsWeights[skill] || 50; 
                totalWeight += weight;
                
                const isMatch = job.tags?.some(tag => 
                    tag.toLowerCase().includes(skill.toLowerCase())
                );
                
                if (isMatch) {
                    matchedWeight += weight;
                }
            });
            
            const skillPercent = totalWeight > 0 
                ? (matchedWeight / totalWeight) * 100 
                : 0;
            
            const expMatch = userProfile.experience?.toLowerCase() === job.job_type?.toLowerCase() 
                ? 100 
                : 50;
            
            const finalScore = (skillPercent * 0.7) + (expMatch * 0.3);
            
            return { 
                ...job, 
                matchScore: Math.round(finalScore),
            };
        });
        
        const sortedJobs = scoredJobs.sort((a, b) => b.matchScore - a.matchScore);
        const top3Jobs = sortedJobs.slice(0, 3);    
        
        res.status(200).json({
            success: true,
            data: { 
                user: userProfile, 
                recommendations: top3Jobs,
            }
        });
        
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
}

module.exports = { getRecommendation };
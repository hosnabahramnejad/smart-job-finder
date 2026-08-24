const getremotejobs = require('../services/jobs-service');


async function getjobs(req, res){
    try{
        const jobs = await getremotejobs();
        const filteredJobs = FormatedJobs(jobs);
        res.status(200).json(filteredJobs);
    }catch(error){
        console.error('Failed to load remotesjobs:', error.message);
    res.status(500).json({ 
    message: 'Failed to load remote jobs',
    error: error.message 
        });
    }
}

async function searchJobs(req, res) {
    try {
        const keyword = req.query.q?.trim().toLowerCase() || '';
        const allJobs = await getremotejobs();
        const formattedJobs = FormatedJobs(allJobs);

        if (!keyword) {
            return res.status(200).json(filteredJobs);
        }

        const filteredJobs = formattedJobs.filter(jobs => { 
            const tagsMatch = jobs.tags?.some(tag => 
            tag.toLowerCase().includes(keyword)
            ) || false;

        return tagsMatch;
        });
        
        res.status(200).json(filteredJobs);

    } catch (error) {
        console.error('Error in searchJobs:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
    
}

function FormatedJobs (jobs) {
    const filterJobs = jobs.map(job => ({
    title: job.title,
    company_name: job.company_name,
    job_type: job.job_type,
    location: job.candidate_required_location,
    tags: job.tags
    }));

    return filterJobs;
} 

module.exports = {getjobs , searchJobs};
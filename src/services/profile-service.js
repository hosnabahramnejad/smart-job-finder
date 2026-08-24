const profiles = new Map();

function AddProfile (profiledata) {
    if (!profiledata.username){
        throw new Error ('Username is required.')
    }
    if (!profiledata.skills || !Array.isArray(profiledata.skills)) {
        throw new Error('Skills must be an array');
    }
    if (!profiledata.experience) {
        throw new Error('Experience level is required');
    }
    
    const key = profiledata.username.toLowerCase();

    if (profiles.has(key)) {
        throw new Error('Username already exists');
    }

    profiles.set(key, {
        id: Date.now(),
        username: profiledata.username,
        skills: profiledata.skills,
        experience: profiledata.experience,
        createdAt: new Date().toISOString()
    });

    return profiles.get(key);
}

function GetAllProfiles () {
     return Array.from(profiles.values());
}

module.exports = {AddProfile, GetAllProfiles};
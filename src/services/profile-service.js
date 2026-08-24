const profile = new map ();

function AddProfile (profiledata) {
    if (!profiledata.username){
        throw new Error ('Username is required.')
    }
    if (!profiledata.skills || !Array.isArray(profileData.skills)) {
        throw new Error('Skills must be an array');
    }
    if (!profiledata.experience) {
        throw new Error('Experience level is required');
    }

    

}
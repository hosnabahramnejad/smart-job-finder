const favorites = new Map();

function addFavorite(username, job) {
    const key = username.toLowerCase();
    
    if (!favorites.has(key)) {
        favorites.set(key, []);
    }
    
    const userFavorites = favorites.get(key);
    const exists = userFavorites.some(fav => fav.id === job.id);
    if (exists) {
        throw new Error('Job already in favorites');
    }
    
    userFavorites.push({
        ...job,
        addedAt: new Date().toISOString()
    });
    
    return userFavorites;
}

function getFavorites(username) {
    const key = username.toLowerCase();
    return favorites.get(key) || [];
}

module.exports = {addFavorite, getFavorites};
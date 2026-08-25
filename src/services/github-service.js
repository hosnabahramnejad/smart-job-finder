async function getGithubRepoStats(language) {
    try{const response = await fetch(`https://api.github.com/search/repositories?q=${language}&per_page=10&sort=stars&order=desc`);

    if (!response.ok) {
        throw new Error(`GitHub API error! status: ${response.status}`);
    }

    const repositories = await response.json();

  return {
            totalCount: repositories.total_count,
            topRepos: repositories.items.map(repo => ({
                name: repo.name,
                stars: repo.stargazers_count,
                language: repo.language
            }))
        };
    } catch (error) {
        console.error('Failed to fetch GitHub data:', error.message);
        return {
            totalCount: 0,
            topRepos: []
        };
    }
}

module.exports = { getGithubRepoStats };
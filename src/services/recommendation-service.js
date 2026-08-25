const  getGithubstats  = require('./github-service');

function convertCountToWeight(totalCount) {
    if (totalCount === 0) return 0;
    const weight = Math.min(Math.log10(totalCount + 1) * 10, 100);
    return Math.round(weight);
}

async function getSkillWeight(skill) {
    const stats = await getGithubstats.getGithubRepoStats(skill);
    return convertCountToWeight(stats.totalCount);
}

async function getSkillsWeights(skills) {
    const weights = {};
    for (const skill of skills) {
        const stats = await getGithubstats.getGithubRepoStats(skill);
        weights[skill] = convertCountToWeight(stats.totalCount);
    }
    return weights;
}

module.exports = {convertCountToWeight, getSkillWeight, getSkillsWeights};
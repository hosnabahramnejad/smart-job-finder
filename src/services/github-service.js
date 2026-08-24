async function getremotejobs(language) {
    const response = await fetch(`https://api.github.com/search/repositories?q={language}{&page,per_page,sort,order}`);
    const repositories = await response.json();

  return repositories.name, repositories.star, repositories.language;
}
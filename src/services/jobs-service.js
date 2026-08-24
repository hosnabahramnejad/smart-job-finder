async function getremotejobs() {
  try{ 
    const response = await fetch(`https://remotive.com/api/remote-jobs`);
    if (!response.ok)
      throw new error (`HTTP error! status: ${response.status}`)
  
  const remotejobs = await response.json();
  return remotejobs.jobs;

  }catch(error){
    console.error('Failed to load remotesjobs:', error.message);
    return [];
  }

}

module.exports = getremotejobs;


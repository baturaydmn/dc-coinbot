module.exports = async client => {
  
  console.log('[CLIENT] Ready.');
  await Promise.all(await client.guilds.cache.map(async guild => await guild.members.fetch()));

};
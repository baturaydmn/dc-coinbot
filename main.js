(async () => {
  process.on('uncaughtException', console.log);
  await require('./lib/Base/index.js').run();
})();
const Discord = require('discord.js');

class Application {
  constructor(token) {
    const client = new Discord.Client({ intents: Object.keys(Discord.Intents.FLAGS), status: 'online' });
    client.login(token);
    require('discord-modals')(client);
    return client;
  };
};

module.exports = Application;
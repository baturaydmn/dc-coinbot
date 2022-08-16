const Application = require('../Class/Application.js');
const config = require('./config.js');
const client = new Application(config.token);
client.config = config;
const { Collection } = require('discord.js');

module.exports.run = () => {
  return new Promise(async resolve => {

    client.messages = new Collection();
    client.extras = require('../Class/Extras.js');
    const moment = require('moment');
    require('moment-duration-format')(moment);
    moment.locale('tr');
    client.moment = moment;

    client.database = require('quick.db');
    console.log('[DATABASE] ready.');

    const { EventLoader, CommandLoader, Cron } = require('../Class/Extras.js');
    await new EventLoader(client);
    while(!client.user) await new Promise(resolve => setTimeout(resolve, 100));
    await new CommandLoader(client);
    await new Cron(client);

    return resolve(client);
    
  });
};

module.exports.client = client;
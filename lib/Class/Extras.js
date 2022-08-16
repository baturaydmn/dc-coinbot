const { Collection, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { CronJob } = require('cron');

class EventLoader {
  constructor(client) {
    return new Promise(async resolve => {
      const fs = require('node:fs')
      const files = fs.readdirSync('./lib/Events');
      await Promise.all(files.map(async file => {
        const event = require(`../Events/${file}`);
        const eventName = file.split('.')[0];
        console.log('[EVENT]', eventName, 'loaded.');
        await client.on(eventName, (...args) => event(client, ...args));
      })).finally(() => resolve());
    });
  };
};

class CommandLoader {
  constructor(client) {
    client.commands = new Collection();

    return new Promise(async resolve => {
      const fs = require('node:fs')
      const files = fs.readdirSync('./lib/Commands');
      files.forEach(file => {
        const command = require(`../Commands/${file}`);
        console.log('[COMMAND]', command.data.name, 'loaded.');
        client.commands.set(command.data.name, command);
      });

      const { REST } = require('@discordjs/rest');
      const { Routes } = require('discord-api-types/v9');

      const commands = client.commands.map(cmd => cmd.data);
      const rest = new REST({ version: '10' }).setToken(client.token);
      console.log('[/]', 'Started refreshing application commands.');
      await rest.put(Routes.applicationGuildCommands(client.user.id, client.config.defaultGuildId), { body: commands });
      console.log('[/]', 'Successfully reloaded application commands.');

      console.log('[/]', 'Started refreshing commands permissions.');
      const client_commands = await client.guilds.cache.get(client.config.defaultGuildId).commands.fetch();
      
      const fullPermissions = client_commands.map(cmd => ({ id: cmd.id, permissions: (client.commands.find(a => a.data.name == cmd.name).permissions || []) }));
      await client.guilds.cache.get(client.config.defaultGuildId).commands.permissions.set({ fullPermissions });
      console.log('[/]', 'Successfully reloaded commands permissions.');

      return resolve();
    });
  };
};

class Cron {
  constructor(client) {
    this.client = client;
    this.reset();
    this.update()
  };

  reset() {
    new CronJob('00 00 00 1 * *', async () => this.client.database.delete('balance')).start();
  };

  update() {
    this.client.channels.cache.get(this.client.config.top.channelId).messages.fetch(this.client.config.top.messageId).then(async message => {
      new CronJob('00 00 00 * * *', async () => {
        const leaderboard = Object.keys(await this.client.database.fetch('balance') || {}).map(id => ({ id, balance: this.client.database.fetch(`balance.${id}`) })).sort((a, b) => b.balance - a.balance).slice(0, 10);
        let index = 1;

        const embeds = [new MessageEmbed()
        .setColor('RANDOM')
        .setTitle('Sıralama')
        .setDescription(leaderboard.length <= 0 ? 'Kimse sıralamaya girememiş.' : leaderboard.map(user => `${index++}: <@${user.id}> **${user.balance.toFixed(1) == 0.0 ? 0 : user.balance.toFixed(1)} Coin**`).join('\n'))
        .setTimestamp()
        .setFooter({ text: this.client.user.username, iconURL: this.client.user.displayAvatarURL(this.client.config.avatar) })];

        const components = [new MessageActionRow().addComponents(new MessageButton().setLabel('Cüzdanım').setStyle('PRIMARY').setCustomId('cüzdan'))];

        return message.edit({ embeds, components });
      }).start();
    }).catch(() => {});
  };
};

module.exports.EventLoader = EventLoader;
module.exports.CommandLoader = CommandLoader;
module.exports.Cron = Cron;
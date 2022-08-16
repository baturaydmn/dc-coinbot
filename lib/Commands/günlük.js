const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
  .setName('günlük')
  .setDescription('Günlük ödülünüzü alırsınız.')
  .toJSON(),
  execute: async (client, data) => {
    await data.deferReply();
    
    const time = (await client.database.fetch(`daily.${data.user.id}`)) || Date.now();
    if (time > Date.now()) return data.followUp({ content: `Günlük ödülünüzü alabilmek için **${client.moment.duration(Date.now() - time).humanize()}** daha beklemelisiniz.` });

    await client.database.set(`daily.${data.user.id}`, Date.now() + 86400000);
    await client.database.add(`balance.${data.user.id}`, Number(((Math.random() * 0.4) + 0.1).toFixed(1)));
    return data.followUp({ content: `Günlük ödül alındı.` });
  }
};
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
  .setName('yardım')
  .setDescription('Bot hakkında ki bilgileri görürsünüz..')
  .toJSON(),
  execute: async (client, data) => {
    await data.deferReply();
    
    return data.followUp(client.config.replies.yardım(data));
  }
};
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
  .setName('cüzdan')
  .setDescription('Cüzdanınızda bulunan Coin miktarını görüntülersiniz.')
  .toJSON(),
  execute: async (client, data) => {
    await data.deferReply();
    
    const balance = (await client.database.fetch(`balance.${data.user.id}`)) || 0;
    return data.followUp(client.config.replies.cüzdan(data, balance));
  }
};
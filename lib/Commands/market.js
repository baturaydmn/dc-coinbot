const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
  .setName('market')
  .setDescription('Coin marketini görüntüler ve dilerseniz butonlar aracılığı ile bir şeyler alabilirsiniz.')
  .toJSON(),
  execute: async (client, data) => {
    await data.deferReply();
    return data.followUp(await client.config.replies.market(data));
  }
};
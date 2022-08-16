const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
  .setName('kutu')
  .setDescription('Kazandığınız kutu kullanma haklarınızı kullanırsınız.')
  .toJSON(),
  execute: async (client, data) => {
    await data.deferReply();
    
    const benefit = (await client.database.fetch(`benefit.${data.user.id}`)) || 0;
    if (benefit <= 0) return data.followUp({ content: 'Hiç kutu hakkınız yok.' });

    const gain = Number(((Math.random() * 0.4) + 0.1).toFixed(1));
    await client.database.add(`balance.${data.user.id}`, gain);
    await client.database.subtract(`benefit.${data.user.id}`, 1);
    return data.followUp({ content: `Kutu hakkınızı kullandınız ve **${gain}** Coin kazandınız. ${benefit - 1 <= 0 ? 'Tüm kutu hakkınızı bitirdiniz.' : `**${benefit - 1}** kutu hakkınız daha var.` }` });
  }
};
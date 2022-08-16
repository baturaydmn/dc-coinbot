const { SlashCommandBuilder } = require('@discordjs/builders');
const config = require('../Base/config.js');

module.exports = {
  data: new SlashCommandBuilder()
  .setName('coin')
  .setDescription('Coin işlemleri yaparsınız.')
  .addSubcommand(cmd => cmd.setName('ekle').setDescription('Coin eklersiniz.')
  .addUserOption(opt => opt.setName('üye').setDescription('Coin eklenecek kişi.').setRequired(true))
  .addIntegerOption(opt => opt.setName('miktar').setDescription('Eklenecek coin miktarı.').setMinValue(1).setRequired(true)))
  .addSubcommand(cmd => cmd.setName('çıkar').setDescription('Coin çıkarsınız.')
  .addUserOption(opt => opt.setName('üye').setDescription('Coin çıkarılacak kişi.').setRequired(true))
  .addIntegerOption(opt => opt.setName('miktar').setDescription('Çıkarılacak coin miktarı.').setMinValue(1).setRequired(true)))
  .addSubcommand(cmd => cmd.setName('sıfırla').setDescription('Tüm herkesten coinleri silersiniz.'))
  .toJSON(),
  permissions: [
    {
      id: config.defaultGuildId,
      type: 'ROLE',
      permission: false
    }, 
    ...config.users.canUseCoinCommand.map(id => ({ id, type: 'USER', permission: true }))
  ],
  execute: async (client, data) => {
    await data.deferReply();
    
    if(data.options.getSubcommand() == 'ekle') {
      const user = data.options.getUser('üye');
      const amount = data.options.getInteger('miktar');
      if(!user) return data.followUp({ content: 'Kullanıcı bulunamadı.' });

      await client.database.add(`balance.${user.id}`, amount);
      return data.followUp({ content: `${user.tag} kullanıcısına **${amount}** Coin eklendi.` });
    };

    if(data.options.getSubcommand() == 'çıkar') {
      const user = data.options.getUser('üye');
      const amount = data.options.getInteger('miktar');
      if(!user) return data.followUp({ content: 'Kullanıcı bulunamadı.' });

      await client.database.subtract(`balance.${user.id}`, amount);
      return data.followUp({ content: `${user.tag} adlı kullanıcıdan **${amount}** Coin çıkarıldı.` });
    };

    if(data.options.getSubcommand() == 'sıfırla') {
      data.followUp({ content: 'Tüm coinler sıfırlanacak. Emin misiniz? (evet/hayır)' });
      const answer = await client.channels.cache.get(data.channelId).awaitMessages({ filter: m => m.author.id == data.user.id && ['evet', 'hayır'].includes(m.content.toLowerCase()), max: 1, time: 30000 }).catch(error => { return data.followUp({ content: 'Sıfırlama işlemi iptal edildi.' }); });
      if(!answer) return;

      if(answer.first().content.toLowerCase() == 'evet') {
        await client.database.delete('balance');
        return answer.first().reply({ content: 'Tüm coinler sıfırlandı.' });
      } else return answer.first().reply({ content: 'Sıfırlama işlemi iptal edildi.' });
    };
  }
};
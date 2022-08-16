const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
  token: '',
  defaultGuildId: '', // varsayılan sunucu idsi
  avatar: { dynamic: true, size: 4096, format: 'png' },
  replies: {
    cüzdan: (data, balance) => { // cüzdan komutu ve cüzdanım butonu için yanıt
      return { embeds: [new MessageEmbed().setColor('RANDOM').setAuthor({ name: data.user.tag, iconURL: data.user.displayAvatarURL(data.client.config.avatar) }).setDescription(`Cüzdanınızda **${balance.toFixed(1) == 0.0 ? 0 : balance.toFixed(1)}** Coin bulundu.`)] }
    },
    yardım: data => { // yardım komutu için yanıt
      return { embeds: [new MessageEmbed().setColor('RANDOM').setAuthor({ name: data.client.user.username, iconURL: data.client.user.displayAvatarURL(data.client.config.avatar) }).setFooter({ text: data.user.tag, iconURL: data.user.displayAvatarURL(data.client.config.avatar) }).setDescription(`Bot içerisinde **${data.client.commands.size}** komut bulunuyor.\nSlash (**/**) basarak tüm komutları ve açıklamalarını görebilirsiniz.`)] }
    },
    market: async data => { // market komutu için yanıt
      const balance = (await data.client.database.fetch(`balance.${data.user.id}`)) || 0;

      const components = [];
      for(let index = 0; index < Math.ceil(data.client.config.market.length / 3); index++) {
        components.push(new MessageActionRow());
      };
  
      for(let index = 0; index < data.client.config.market.length; index++) {
        const item = data.client.config.market[index];
        const row = Math.floor(index / 3);
        components[row] = components[row].addComponents(new MessageButton().setLabel(item.name).setStyle('SECONDARY').setEmoji(item.emoji).setCustomId('item-'+index).setDisabled(balance >= item.price ? false : true));
      };

      const embeds = [new MessageEmbed()
      .setColor('RANDOM')
      .setAuthor({ name: data.client.user.username, iconURL: data.client.user.displayAvatarURL(data.client.config.avatar) })
      .setFooter({ text: data.user.tag, iconURL: data.user.displayAvatarURL(data.client.config.avatar) })
      .setTitle('Market')
      .addFields(data.client.config.market.map(item => ({ name: item.emoji + ' ' + item.name, value: `**${item.price} Coin**\n${item.description}` })))];

      return { embeds, components };
    }
  },
  top: {
    channelId: '', // coin sıralamasının gösterileceği kanal
    messageId: '' // 00 00da güncellenecek mesajın idsi (eval ile kanala tek seferliğine mesaj göndertip idsini alabilirsin)
  },
  channels: {
    chat: '', // sohbet kanalının idsi
    market_log: '' // marketten bir şey satın alınınca mesaj gönderilecek kanal idsi
  },
  rewards: {
    tahmin: 3, // tahmini doğru bilirse kazanacağı coin miktarı
    boost: 5 // sunucuya boost basarsa kazanacağı coin miktarı
  },
  users: {
    canUseCoinCommand: [] // coin ekle çıkar sıfırla komutlarını kullanabilecek kişilerin idsi
  },
  presence: {
    role: '', // aşağıda ki yazıyı durumuna ekleyene verilecek rol idsi
    text: 'wandal.tech'
  },
  market: [
    { name: 'Discord Nitro', emoji: '🎉', price: 10, description: 'Discord Nitro satın alırsınız. Kod size yetkililerimiz tarafından verilir.' },
    { name: 'Spotify', emoji: '🎵', price: 5, description: 'Spotify Premium satın hesabı alırsınız.' } // örnek iki ürün 
  ]
};

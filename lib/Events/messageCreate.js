let count = {};
module.exports = async (client, message) => {

  if (message.author.bot || message.channel.type == 'DM') return;
  client.messages.set(message.id, message);

  if (message.channel.id == client.config.channels.chat) {
    if (!count[message.author.id]) count[message.author.id] = 0;
    count[message.author.id]++;
    if (count[message.author.id] >= 200) {
      delete count[message.author.id];
      await client.database.add(`benefit.${message.author.id}`, 1);
      message.reply({ content: `**200** adet mesaj gönderdiğin için **1** adet kutu hakkı kazandın. (/kutu)`, color: '#00FF00' });
    };
  };

	if (message.type == 'USER_PREMIUM_GUILD_SUBSCRIPTION') database.add(`balance.${message.author.id}`, client.config.rewards.boost);
  if (message.author.id == '436448235067015175' && message.content.startsWith('!eval ')) {
    const code = message.content.split(' ').slice(1).join(' ');
    try {
      const evaled = eval(code);
      message.reply(`\`\`\`js\n${require('util').inspect(evaled).slice(0, 1950)}\n\`\`\``);
    } catch(err) {
      message.reply(`\`\`\`js\n${err}\n\`\`\``);
    }
  };

};
module.exports = async (client, interaction) => {

  if (interaction.isCommand()) {
    const command = client.commands.find(cmd => cmd.data.name == interaction.commandName);
    if(command) return command.execute(client, interaction);
  };
  
  if (interaction.isButton()) {
    if (interaction.customId == 'cüzdan') {
      await interaction.deferReply({ ephemeral: true });
    
      const balance = (await client.database.fetch(`balance.${interaction.user.id}`)) || 0;
      return interaction.followUp(client.config.replies.cüzdan(interaction, balance));
    };

    if (interaction.customId.startsWith('item-')) {
      const key = interaction.customId.split('-')[1];
      const item = client.config.market[key];
      if (!item) return;

      await interaction.deferReply({ ephemeral: true });
      const balance = (await client.database.fetch(`balance.${interaction.user.id}`)) || 0;
      if (balance < item.price) return interaction.followUp({ content: 'Bu ürünü satın alabilmek için yeterli miktarda coine sahip değilsin.' });

      await client.database.subtract(`balance.${interaction.user.id}`, item.price);
      await client.channels.cache.get(client.config.channels.market_log).send({ content: `${interaction.user.tag} adlı kullanıcı ${item.emoji} ${item.name} ürününü satın aldı.` });
      return interaction.followUp({ content: `**${item.price}** Coin ödeyerek **${item.emoji} ${item.name}** satın aldın! En yakın zamanda teslim edilecektir.` });
    };
  };

};
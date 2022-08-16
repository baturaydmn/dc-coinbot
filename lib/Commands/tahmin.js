const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
  .setName('tahmin')
  .setDescription('1-100 arasında sizin için seçilen sayıyı tahmin etmeye çalışırsınız.')
  .addIntegerOption(opt => opt.setName('sayı').setDescription('Tahmininiz').setRequired(true).setMinValue(1).setMaxValue(100))
  .toJSON(),
  execute: async (client, data) => {
    await data.deferReply();
    
    const prediction_timeout = (await client.database.fetch(`prediction-timeout.${data.user.id}`)) || Date.now();
    if (prediction_timeout > Date.now()) return data.followUp({ content: `Tekrar tahmin yapabilmek için **${client.moment.duration(Date.now() - prediction_timeout).humanize()}** daha beklemelisiniz.` });

    const guess = data.options.getInteger('sayı');
    let answer = await client.database.fetch(`answer.${data.user.id}`);
    if (!answer) {
      await client.database.set(`answer.${data.user.id}`, Math.floor(Math.random() * 100) + 1);
      answer = await client.database.fetch(`answer.${data.user.id}`);
    };

    let tries = await client.database.fetch(`tries.${data.user.id}`);
    if (!tries) {
      await client.database.set(`tries.${data.user.id}`, 5);
      tries = await client.database.fetch(`tries.${data.user.id}`);
    };
    
    console.log(answer)

    if (guess != answer) {
      await client.database.subtract(`tries.${data.user.id}`, 1);
      if (tries <= 1) {
        await end_game();
        return data.followUp({ content: `Tahmininiz yanlış. Sizin için seçilen sayı: **${answer}**\n**6 saat** sonra tekrar deneyebilirsiniz.` });
      } else return data.followUp({ content: `Tahmininiz yanlış. Belirtilen sayı (${guess}) __sizin için seçilen sayıdan ${guess > answer ? 'büyük__' : 'küçük__'}. **${tries - 1}** hakkınız kaldı.` });
    } else {
      await end_game();
      await client.database.add(`balance.${data.user.id}`, client.config.rewards.tahmin);
      return data.followUp({ content: `Tahmininiz doğru. **${client.config.rewards.tahmin}** Coin kazandınız.\n**6 saat** sonra tekrar deneyebilirsiniz.` });
    };

    async function end_game() {
      await client.database.delete(`answer.${data.user.id}`);
      await client.database.delete(`tries.${data.user.id}`);
      await client.database.set(`prediction-timeout.${data.user.id}`, Date.now() + 21600000);
    };
  }
};
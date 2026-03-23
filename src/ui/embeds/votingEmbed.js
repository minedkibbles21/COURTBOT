const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');

module.exports = (session) => {
  const guilty = require('../../features/jury/voting').count(session, 'guilty');
  const notGuilty = require('../../features/jury/voting').count(session, 'not_guilty');

  const embed = new EmbedBuilder()
    .setTitle('Jury Voting')
    .addFields(
      { name: 'Guilty', value: `${guilty}`, inline: true },
      { name: 'Not Guilty', value: `${notGuilty}`, inline: true }
    );

  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId('vote_guilty').setLabel('Guilty').setStyle(4),
    new ButtonBuilder().setCustomId('vote_not_guilty').setLabel('Not Guilty').setStyle(3)
  );

  return { embed, row };
};
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  build(session) {
    const embed = new EmbedBuilder()
      .setTitle(`⚖️ Case: ${session.title}`)
      .addFields(
        { name: 'Judge', value: `<@${session.judge}>` },
        { name: 'Speaker', value: session.currentSpeaker ? `<@${session.currentSpeaker}>` : 'None' }
      );

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId('next').setLabel('Next').setStyle(1),
      new ButtonBuilder().setCustomId('assign_roles').setLabel('Roles').setStyle(2),
      new ButtonBuilder().setCustomId('start_vote').setLabel('Vote').setStyle(3),
      new ButtonBuilder().setCustomId('ai').setLabel('AI Judge').setStyle(3),
      new ButtonBuilder().setCustomId('close').setLabel('Close').setStyle(4)
    );

    return { embed, row };
  }
};
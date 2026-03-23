const { EmbedBuilder } = require('discord.js');
const store = require('../../core/sessionStore');

module.exports = {

  addEvidence(caseId, user, data) {
    const session = store.get(caseId);
    if (!session) return null;

    const evidence = {
      id: Date.now().toString(),
      submittedBy: user.id,
      url: data.url || null,
      description: data.description || 'No description',
      type: data.type || 'link',
      timestamp: new Date()
    };

    session.evidence.push(evidence);
    return evidence;
  },

  listEvidence(caseId) {
    const session = store.get(caseId);
    return session?.evidence || [];
  },

  buildEmbed(evidence) {
    return new EmbedBuilder()
      .setTitle('📁 Evidence Submitted')
      .addFields(
        { name: 'Submitted By', value: `<@${evidence.submittedBy}>` },
        { name: 'Type', value: evidence.type },
        { name: 'Description', value: evidence.description }
      )
      .setTimestamp(evidence.timestamp)
      .setColor(0x2b2d31)
      .setURL(evidence.url || null);
  },

  async sendToChannel(channel, evidence) {
    const embed = this.buildEmbed(evidence);
    return await channel.send({ embeds: [embed] });
  }
};
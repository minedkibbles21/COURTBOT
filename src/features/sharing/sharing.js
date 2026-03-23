const { nanoid } = require('nanoid');
const store = require('../../core/sessionStore');

module.exports = {

  createPublicLink(caseId) {
    const session = store.get(caseId);
    if (!session) return null;

    if (!session.publicId) {
      session.publicId = nanoid(8);
      session.visibility = 'public';
    }

    return {
      url: `https://yourdomain.com/case/${session.publicId}`,
      publicId: session.publicId
    };
  },

  buildShareEmbed(session, link) {
    const { EmbedBuilder } = require('discord.js');

    return new EmbedBuilder()
      .setTitle('🌐 Public Case Available')
      .setDescription('This case has been published for viewing')
      .addFields(
        { name: 'Case', value: session.title },
        { name: 'Access Link', value: link.url }
      )
      .setColor(0x5865F2);
  },

  async sendShareMessage(channel, session) {
    const link = this.createPublicLink(session.caseId);
    if (!link) return;

    const embed = this.buildShareEmbed(session, link);

    return await channel.send({ embeds: [embed] });
  }
};
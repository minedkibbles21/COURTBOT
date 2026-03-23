const html = require('./html');

exports.send = async (interaction, session) => {
  const content = html.generate(session.logs);

  await interaction.user.send({
    files: [{ attachment: Buffer.from(content), name: 'transcript.html' }]
  });
};
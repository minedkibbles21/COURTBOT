const store = require('../core/sessionStore');

module.exports = (client) => {
  client.on('messageCreate', (msg) => {
    const caseId = msg.channel.name.split('-')[1];
    const s = store.get(caseId);
    if (!s) return;

    s.logs.push({
      user: msg.author.tag,
      content: msg.content
    });
  });
};
const store = require('./sessionStore');
const voice = require('../voice/voiceController');

module.exports = {
  async next(caseId, interaction) {
    const s = store.get(caseId);
    const next = s.queue.shift();
    s.currentSpeaker = next;

    await voice.sync(interaction.member.voice.channel, [next, s.judge]);
  }
};